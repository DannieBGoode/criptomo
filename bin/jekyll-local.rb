#!/usr/bin/env ruby
# frozen_string_literal: true

require "bundler/setup"

jekyll_spec = Gem.loaded_specs.fetch("jekyll")
jekyll_lib = File.join(jekyll_spec.full_gem_path, "lib")
jekyll_boot = File.join(jekyll_lib, "jekyll.rb")

source = File.read(jekyll_boot, :encoding => "UTF-8")
patched_source = source.sub(
  "def require_all(path)\n" \
  "  glob = File.join(__dir__, path, \"*.rb\")\n" \
  "  Dir[glob].sort.each do |f|\n" \
  "    require f\n" \
  "  end\n" \
  "end\n",
  "def require_all(path)\n" \
  "  base = File.join(__dir__, path)\n" \
  "  return unless Dir.exist?(base)\n" \
  "  Dir.chdir(base) do\n" \
  "    Dir[\"*.rb\"].sort.each do |file|\n" \
  "      require File.join(base, file)\n" \
  "    end\n" \
  "  end\n" \
  "end\n"
)

abort("Failed to patch Jekyll boot loader") if patched_source == source

$LOAD_PATH.unshift(jekyll_lib) unless $LOAD_PATH.include?(jekyll_lib)
$LOADED_FEATURES << jekyll_boot unless $LOADED_FEATURES.include?(jekyll_boot)

eval(patched_source, TOPLEVEL_BINDING, jekyll_boot)

liquid_spec = Gem.loaded_specs.fetch("liquid")
liquid_tags_dir = File.join(liquid_spec.full_gem_path, "lib", "liquid", "tags")
Dir.chdir(liquid_tags_dir) do
  Dir["*.rb"].sort.each do |file|
    require File.join(liquid_tags_dir, file)
  end
end

Liquid::Template.register_tag("include", Jekyll::Tags::IncludeTag)

rouge_spec = Gem.loaded_specs.fetch("rouge")
require "rouge"
unless defined?(Rouge::Lexers::PlainText)
  require File.join(rouge_spec.full_gem_path, "lib", "rouge", "lexers", "plain_text")
end

load File.join(jekyll_spec.full_gem_path, "exe", "jekyll")
