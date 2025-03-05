const { STRAPI_HOST, STRAPI_TOKEN } = process.env;

export function query(url: string) {
  return fetch(`${STRAPI_HOST}/api${url}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  }).then((res) => res.json());
}

export async function getData(url: string) {
  const res = await query("/portfolio" + url);
  console.log("Datos resueltos:", res);
  return res;
}

(async () => {
  try {
    const data = await getData("?populate=*");
    console.log("Datos obtenidos:", data);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
})();


let a  = 4;
let b = 5;
console.log(  a + b);