import BaseTemplate from "@/components/templates/BaseTemplate/page.jsx";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}

export default async function LangLayout({ children }) {
  return <BaseTemplate>{children}</BaseTemplate>;
}
