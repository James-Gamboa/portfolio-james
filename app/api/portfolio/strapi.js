export async function query(url) {
  try {
    console.log('Fetching from:', `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api${url}`);
    console.log('Using API Key:', process.env.NEXT_PUBLIC_STRAPI_API_KEY);
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api${url}`, {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      console.error('Response status:', response.status);
      console.error('Response headers:', response.headers);
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
    const res = await query("/portfolio?populate[projects][populate]=imageSrc&populate[resume][populate]=*");
    
    if (!res.data) {
      throw new Error('No data received from API');
    }

    const transformedData = {
      ...res.data,
      attributes: {
        ...res.data,
        projects: res.data.projects?.data || [],
        services: res.data.services?.data || [],
        socials: res.data.socials?.data || [],
        resume: res.data.resume || {
          tagline: "",
          description: "",
          experiences: [],
          education: {
            universityName: "",
            universityDate: "",
            universityPara: ""
          },
          languages: [],
          frameworks: [],
          others: []
        }
      }
    };

    return transformedData;
  } catch (error) {
    console.error("Error in getData:", error);
    throw error;
  }
}

// Solo ejecutar en desarrollo
if (process.env.NODE_ENV === 'development') {
  (async () => {
    try {
      const data = await getData();
      console.log("Datos obtenidos:", data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  })();
}