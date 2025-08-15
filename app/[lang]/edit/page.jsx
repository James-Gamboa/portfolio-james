import EditTemplate from "@/components/templates/EditTemplate/page.jsx";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const dict = await import(`@/components/lib/dictionaries/${lang}.json`);

  return {
    title: dict.default.metadata.edit.title,
    description: dict.default.metadata.edit.description,
  };
}

export default async function EditPage({ params }) {
  const dict = await import(
    `@/components/lib/dictionaries/${params.lang}.json`
  ).catch(() => import("@/components/lib/dictionaries/en.json"));

  return <EditTemplate lang={params.lang} dict={dict.default} />;
}
