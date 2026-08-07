import React, { useEffect, useState } from 'react';
import { MessageSquare, AlertCircle } from 'lucide-react';

interface DisqusCommentsProps {
  url?: string;
  identifier?: string;
  title?: string;
}

export const DisqusComments: React.FC<DisqusCommentsProps> = ({
  url = typeof window !== 'undefined' ? window.location.href : 'https://active-ageing.disqus.com',
  identifier = 'active-ageing-main',
  title = 'Active Aging Community Discussion',
}) => {
  const [scriptError, setScriptError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    try {
      // Set up disqus_config on global window
      (window as any).disqus_config = function (this: any) {
        this.page.url = url;
        this.page.identifier = identifier;
        this.page.title = title;
      };

      // Handle window script errors from cross-origin disqus scripts gracefully
      const handleGlobalError = (event: ErrorEvent) => {
        if (event.message && (event.message.includes('Script error') || event.message.includes('disqus'))) {
          // Suppress cross-origin script error from bubbling as breaking app crash
          if (isMounted) {
            console.warn('Disqus script loading notice:', event.message);
          }
        }
      };

      window.addEventListener('error', handleGlobalError);

      // If DISQUS is already loaded on window, reset with new config
      if (typeof (window as any).DISQUS !== 'undefined') {
        try {
          (window as any).DISQUS.reset({
            reload: true,
            config: (window as any).disqus_config,
          });
        } catch (err) {
          console.warn('Error resetting Disqus:', err);
        }
      } else {
        // Append main embed.js script if not present
        if (!document.getElementById('dsq-embed-scr')) {
          const embedScript = document.createElement('script');
          embedScript.id = 'dsq-embed-scr';
          embedScript.src = 'https://active-ageing.disqus.com/embed.js';
          embedScript.setAttribute('data-timestamp', (+new Date()).toString());
          embedScript.async = true;
          
          embedScript.onerror = () => {
            if (isMounted) {
              setScriptError(true);
            }
          };

          (document.head || document.body).appendChild(embedScript);
        }

        // Append count.js script if not present
        if (!document.getElementById('dsq-count-scr')) {
          const countScript = document.createElement('script');
          countScript.id = 'dsq-count-scr';
          countScript.src = 'https://active-ageing.disqus.com/count.js';
          countScript.async = true;
          
          countScript.onerror = () => {
            // Ignore count.js non-critical errors
          };

          (document.head || document.body).appendChild(countScript);
        }
      }

      return () => {
        isMounted = false;
        window.removeEventListener('error', handleGlobalError);
      };
    } catch (err) {
      console.warn('Disqus initialization error caught:', err);
      if (isMounted) setScriptError(true);
    }
  }, [url, identifier, title]);

  return (
    <section className="mt-12 pt-8 border-t border-white/10 w-full" id="community-discussion">
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 border border-white/15 bg-[#171321]/80 shadow-2xl">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <div className="p-2.5 rounded-xl bg-[#7c3aed]/20 text-[#d2bbff] border border-[#7c3aed]/30">
            <MessageSquare className="w-5 h-5 text-[#d2bbff]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#e8dfee]">Community Discussion</h3>
            <p className="text-xs text-[#958da1]">
              Share your thoughts, longevity insights, and questions with our active aging community
            </p>
          </div>
        </div>

        {scriptError ? (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200/90 flex items-center gap-3 text-sm">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <span>
              Disqus comments are currently loading or restricted in preview mode. You can view full discussions when accessing the site directly.
            </span>
          </div>
        ) : (
          /* Disqus Thread Container matching standard id */
          <div id="disqus_thread" className="min-h-[220px]" />
        )}

        <noscript>
          Please enable JavaScript to view the{' '}
          <a href="https://disqus.com/?ref_noscript" rel="nofollow" className="text-[#d2bbff] underline">
            comments powered by Disqus.
          </a>
        </noscript>
      </div>
    </section>
  );
};

