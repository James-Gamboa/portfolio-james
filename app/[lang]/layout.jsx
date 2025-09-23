import BaseTemplate from "@/components/templates/BaseTemplate/page.jsx";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <BaseTemplate>{children}</BaseTemplate>
      </body>
    </html>
  );
}
