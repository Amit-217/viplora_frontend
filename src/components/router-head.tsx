import { component$ } from '@builder.io/qwik';
import { useDocumentHead, useLocation } from '@builder.io/qwik-city';

/**
 * This component is placed inside a `<head>` tag.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <title>{head.title || 'Viplora Tech - Advanced Tech Solutions'}</title>

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content={head.meta.find((m) => m.name === 'description')?.content || 'Advanced technology solutions for modern businesses'}
      />

      <link rel="canonical" href={loc.url.href} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:title" content={head.title || 'Viplora Tech'} />
      <meta property="og:url" content={loc.url.href} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://viplora.tech/og-image.png" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={head.title || 'Viplora Tech'} />
      <meta name="twitter:image" content="https://viplora.tech/og-image.png" />

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      {/* Meta */}
      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {/* Links */}
      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {/* Styles */}
      {head.styles.map((s) => {
        // strip existing dangerouslySetInnerHTML if present
        const { dangerouslySetInnerHTML: _, ...safeProps } = s.props ?? {};
        return (
          <style
            key={s.key}
            {...safeProps}
            dangerouslySetInnerHTML={s.style}
          />
        );
      })}

      {/* Scripts */}
      {head.scripts.map((s) => {
        const { dangerouslySetInnerHTML: _, ...safeProps } = s.props ?? {};
        return (
          <script
            key={s.key}
            {...safeProps}
            dangerouslySetInnerHTML={s.script}
          />
        );
      })}
    </>
  );
});
