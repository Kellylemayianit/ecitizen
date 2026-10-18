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
`;
