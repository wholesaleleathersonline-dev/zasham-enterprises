export function getProductRoute(sport: string) {
  switch (sport) {
    case "Team Apparel":
      return {
        section: "team-apparel",
        folder: "apparel",
      };

    case "Team Accessories":
      return {
        section: "team-accessories",
        folder: "accessories",
      };

    default:
      return {
        section: "team-uniforms",
        folder: sport.toLowerCase().replace(/\s+/g, "-"),
      };
  }
}