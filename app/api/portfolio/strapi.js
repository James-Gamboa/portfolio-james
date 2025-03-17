export async function query(url) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api${url}`, {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getData() {
  try {
    const res = await query("/portfolio?populate[projects][populate]=*");
    
    if (!res.data) {
      throw new Error('No data received from API');
    }

    const transformedData = {
      ...res.data,
      attributes: {
        ...res.data,
        projects: res.data.projects?.data || [],
        services: res.data.services?.data || [],
        socials: res.data.socials?.data || []
      }
    };

    return transformedData;
  } catch (error) {
    console.error("Error in getData:", error);
    throw error;
  }
}

(async () => {
  try {
    const data = await getData();
    console.log("Datos obtenidos:", data);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
})();