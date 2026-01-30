'use client';

import { Link } from '@/core/i18n/navigation';
import {
  BrandLogo,
  Copyright,
  ThemeToggler,
} from '@/shared/blocks/common';
import { SmartIcon } from '@/shared/blocks/common/smart-icon';
import { NavItem } from '@/shared/types/blocks/common';
import { Footer as FooterType } from '@/shared/types/blocks/landing';
import { Button } from '@/shared/components/ui/button';

export function Footer({ footer }: { footer: FooterType }) {
  return (
    <footer
      id={footer.id}
      className={`py-12 sm:py-16 ${footer.className || ''} bg-slate-950 border-t border-white/6`}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
          <div className="space-y-4">
            {footer.brand ? <BrandLogo brand={footer.brand} /> : null}
            {footer.brand?.description ? (
              <p
                className="text-sm text-muted-foreground max-w-md"
                dangerouslySetInnerHTML={{ __html: footer.brand.description }}
              />
            ) : null}

            {footer.social ? (
              <div className="mt-4 text-sm text-muted-foreground">
                {(() => {
                  const email = footer.social?.items?.find((i: any) => i.url?.startsWith?.('mailto:'))?.url?.replace('mailto:', '');
                  const others = footer.social?.items?.filter((i: any) => !i.url?.startsWith?.('mailto:')) ?? [];
                  return (
                    <>
                      {email && (
                        <p>
                          Contact: <Link href={`mailto:${email}`} className="hover:text-primary underline">{email}</Link>
                        </p>
                      )}

                      {others.length > 0 && (
                        <p className="mt-2">
                          Follow: {others.map((o: any, i: number) => (
                            <Link key={i} href={o.url || ''} target={o.target || ''} className="inline-block mr-4 hover:text-primary">
                              {o.title || o.url}
                            </Link>
                          ))}
                        </p>
                      )}
                    </>
                  );
                })()}
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:col-span-1">
            {footer.nav?.items.map((col, idx) => (
              <div key={idx} className="min-w-0">
                <h4 className="text-sm font-semibold text-white">{col.title}</h4>
                <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
                  {col.children?.map((link, i) => (
                    <Link
                      key={i}
                      href={link.url || ''}
                      target={link.target || ''}
                      className="hover:text-primary duration-150"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold text-white">Stay in the loop</h4>
            <p className="mt-2 text-sm text-muted-foreground">Subscribe to get product updates and news.</p>

            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                // no-op: only UI for now
              }}
            >
              <input
                aria-label="Email"
                type="email"
                placeholder="you@company.com"
                className="flex-1 rounded-md border border-white/10 bg-white/3 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <Button size="sm" className="h-10">Subscribe</Button>
            </form>

            <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
              {footer.show_theme !== false ? <ThemeToggler type="toggle" /> : null}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/6 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="text-sm">
            {footer.copyright ? (
              <p dangerouslySetInnerHTML={{ __html: footer.copyright }} />
            ) : footer.brand ? (
              <Copyright brand={footer.brand} />
            ) : null}
          </div>

          <div className="flex items-center gap-4">
            {footer.agreement?.items.map((item: NavItem, index: number) => (
              <Link
                key={index}
                href={item.url || ''}
                target={item.target || ''}
                className="text-muted-foreground hover:text-primary text-xs underline duration-150"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
