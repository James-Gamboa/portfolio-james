import { serializeJsonLd } from "@/lib/seo";

/**
 * Server-rendered JSON-LD block. serializeJsonLd escapes "<", so the payload
 * cannot close the script tag.
 */
const JsonLd = ({ data }) => (
  <script
    type="application/ld+json"
    // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
    dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
  />
);

export default JsonLd;
