import { notFound } from "next/navigation";

// The content editor is a local development tool: it is not available (404)
// in production builds and is never indexed.
export const metadata = {
  robots: { index: false, follow: false },
};

export default async function EditPage({ params }) {
  if (process.env.NODE_ENV !== "development") notFound();

  const { lang } = await params;

  const { default: EditTemplate } =
    await import("@/components/templates/EditTemplate/page.jsx");
  const dict = await import(`@/components/lib/dictionaries/${lang}.json`).catch(
    () => import("@/components/lib/dictionaries/en.json"),
  );

  return <EditTemplate lang={lang} dict={dict.default} />;
}
