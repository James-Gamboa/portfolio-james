export async function query(url) {
  try {
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
    const res = await query("/portfolio?populate[projects][populate]=imageSrc&populate[resume][populate]&populate[socials][populate]&populate[Services][populate]=*");    
    if (!res.data) {
      throw new Error('No data received from API');
    }

    const transformedData = {
      ...res.data,
      attributes: {
        ...res.data,
        projects: res.data.projects || [],
        services: res.data.Services || [],
        Socials: res.data.Socials?.data || [],
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