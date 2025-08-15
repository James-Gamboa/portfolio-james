import { getDictionary } from "@/components/lib/dictionaries";
import EditTemplate from "@/components/templates/EditTemplate/page.jsx";

export default async function EditPage({ params }) {
  const dict = await getDictionary(params.lang);
  return <EditTemplate lang={params.lang} dict={dict} />;
}
