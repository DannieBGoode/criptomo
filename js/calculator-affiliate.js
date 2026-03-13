(function () {
    document.querySelectorAll('.calculator-affiliate-codebox').forEach(function (box) {
        var el = box.querySelector('.calculator-affiliate-code');
        if (!el) return;

        function doCopy() {
            var code = el.getAttribute('data-code');
            var copiedLabel = box.getAttribute('data-copied') || '✓ Copied';
            function showFeedback() {
                el.textContent = copiedLabel;
                setTimeout(function () { el.textContent = code; }, 2000);
            }
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(code).then(showFeedback).catch(function () {
                    fallbackCopy(code);
                    showFeedback();
                });
            } else {
                fallbackCopy(code);
                showFeedback();
            }
        }

        function fallbackCopy(text) {
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;pointer-events:none';
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            try { document.execCommand('copy'); } catch (e) {
                // Ignore unsupported legacy copy failures.
            }
            document.body.removeChild(ta);
        }

        box.addEventListener('click', doCopy);
        box.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                doCopy();
            }
        });
    });
}());
