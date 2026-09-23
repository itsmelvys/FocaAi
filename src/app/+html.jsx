export default function Html({ children }) {
  return (
    <html lang="pt-BR" style={{ height: '100%' }}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
      </head>
      <body style={{ height: '100%', margin: 0, overflow: 'hidden' }}>{children}</body>
    </html>
  );
}
