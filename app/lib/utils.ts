export function getSiteUrl() {
  let siteUrl = process.env.SITE_URL;
  if (process.env.VERCEL === "1") {
    switch (process.env.VERCEL_ENV) {
      case "production":
        siteUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
        break;
      case "development":
      case "preview":
        siteUrl = `https://${process.env.VERCEL_BRANCH_URL}`;
        break;
    }
  }
  console.log("siteUrl:", siteUrl);
  return siteUrl;
}
