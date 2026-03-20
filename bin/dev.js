#!/usr/bin/env node
/**
 * Smart dev server: incremental rebuilds for edits, full restart for new files.
 *
 * - Uses --incremental for fast rebuilds on file edits (existing posts, templates, CSS…)
 * - Watches _posts/ for new files; when detected, kills Jekyll and restarts without
 *   --incremental so the new file is picked up cleanly.
 * - After the full restart Jekyll switches back to --incremental for subsequent edits.
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '..', '_posts');
const JEKYLL_CMD = 'bundle';
const JEKYLL_ARGS_INCREMENTAL = ['exec', 'ruby', 'bin/jekyll-local.rb', 'serve', '--incremental'];
const JEKYLL_ARGS_FULL       = ['exec', 'ruby', 'bin/jekyll-local.rb', 'serve', '--incremental'];
// We do one full build first, then switch to incremental. On "new file" we kill+restart.

let jekyllProcess = null;
let restarting = false;
const knownFiles = new Set();

function collectKnownFiles(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectKnownFiles(full);
    } else {
      knownFiles.add(full);
    }
  }
}

function startJekyll(incremental) {
  const args = incremental
    ? ['exec', 'ruby', 'bin/jekyll-local.rb', 'serve', '--incremental']
    : ['exec', 'ruby', 'bin/jekyll-local.rb', 'serve'];

  console.log(`\n▶  Starting Jekyll (${incremental ? 'incremental' : 'FULL BUILD'})…\n`);
  jekyllProcess = spawn(JEKYLL_CMD, args, { stdio: 'inherit', shell: process.platform === 'win32' });

  jekyllProcess.on('exit', (code) => {
    if (!restarting) {
      console.log(`Jekyll exited (${code}). Exiting watcher.`);
      process.exit(code ?? 0);
    }
  });
}

function restartFull() {
  if (restarting) return;
  restarting = true;
  console.log('\n🔄  New post detected — restarting with full build…\n');
  jekyllProcess.kill('SIGTERM');
  setTimeout(() => {
    restarting = false;
    // Re-scan known files so we don't re-trigger on the same files
    collectKnownFiles(POSTS_DIR);
    startJekyll(false);
  }, 1500);
}

function watchDir(dir) {
  fs.watch(dir, { recursive: true }, (eventType, filename) => {
    if (!filename || eventType !== 'rename') return;

    // Find all files that are new (not in knownFiles)
    let foundNew = false;
    function scanNew(d) {
      try {
        for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
          const full = path.join(d, entry.name);
          if (entry.isDirectory()) {
            scanNew(full);
          } else if (!knownFiles.has(full)) {
            console.log(`  ➕ New file: ${path.relative(process.cwd(), full)}`);
            foundNew = true;
          }
        }
      } catch (_) {}
    }
    scanNew(POSTS_DIR);

    if (foundNew) restartFull();
  });
}

// ── Main ──────────────────────────────────────────────────────────────────────

collectKnownFiles(POSTS_DIR);
startJekyll(true);   // first launch uses incremental (Jekyll does a full build on first run anyway)
watchDir(POSTS_DIR);

process.on('SIGINT', () => {
  console.log('\nStopping…');
  if (jekyllProcess) jekyllProcess.kill('SIGTERM');
  process.exit(0);
});
