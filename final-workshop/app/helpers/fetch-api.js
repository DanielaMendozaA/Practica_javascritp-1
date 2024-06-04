export async function fetchApi(url, options) {
    try {
      const resp = await fetch(url, options);
      if (!resp.ok) { // Verifica si la respuesta es exitosa
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
      console.log(resp, typeof resp);
      const data = await resp.json();
      return data;
    } catch (error) {
      console.error('Fetch API error:', error.message);
      return null; // Devuelve null para indicar que la solicitud falló
    }
  }
  

