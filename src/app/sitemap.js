export default async function sitemap() {
  const baseUrl = "https://sleeperwoodvilla.com";
  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}


