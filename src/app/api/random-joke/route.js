export async function GET() {
  console.log("API KEY", process.env.NEXT_PUBLIC_API_NINJAS_KEY);
  const response = await fetch("https://api.api-ninjas.com/v1/jokes?limit=1", {
    headers: {
      "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJAS_KEY,
    },
  });

  if (!response.ok) {
    return new Response("Failed to fetch joke", { status: response.status });
  }

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
