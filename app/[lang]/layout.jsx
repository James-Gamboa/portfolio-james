import BaseTemplate from "@/components/templates/BaseTemplate/page.jsx";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body>
        <BaseTemplate>{children}</BaseTemplate>
      </body>
    </html>
  );
}
