import { serializeJsonLd } from "@/lib/seo";

/** Server-rendered JSON-LD block. */
const JsonLd = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
  />
);

export default JsonLd;
