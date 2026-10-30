import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

// Web only: page shell, font and base CSS. Native apps ignore this file.
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Mandhari</title>
        <meta name="theme-color" content="#0E3B2E" />
        <meta name="color-scheme" content="light dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700&display=swap" />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const css = `
body{background:#E4E9E3;color:#10231C}
@media (prefers-color-scheme:dark){body{background:#070D0A;color:#E8F0EB}}
#root *{font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',sans-serif}
input,textarea{outline-color:#0E3B2E}
@keyframes mspin{to{transform:rotate(360deg)}}
#root:empty::after{content:"";position:fixed;top:50%;left:50%;width:36px;height:36px;margin:-18px 0 0 -18px;border:3px solid rgba(14,59,46,.15);border-top-color:#0E3B2E;border-radius:50%;animation:mspin .8s linear infinite}
@media (prefers-color-scheme:dark){#root:empty::after{border-color:rgba(127,209,174,.2);border-top-color:#7FD1AE}}
@media (prefers-reduced-motion:reduce){#root:empty::after{animation-duration:2.4s}}
`;
