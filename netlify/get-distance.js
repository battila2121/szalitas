export async function handler(event) {
  const params = event.queryStringParameters;
  const origin = params.origin;
  const destination = params.destination;
  const apiKey = "AIzaSyA1Q3UiGliCDAitN9ZgnedVGzsICxUTb8Y";

  if (!origin || !destination) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing origin or destination" })
    };
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&mode=driving&units=metric&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Request failed", details: err.message })
    };
  }
}
