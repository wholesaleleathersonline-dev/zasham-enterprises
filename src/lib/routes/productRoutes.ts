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

export function getSportFromFolder(folder: string) {
  switch (folder) {
    case "american-football":
      return "American Football";

    case "flag-football":
      return "Flag Football";

    case "basketball":
      return "Basketball";

    case "baseball":
      return "Baseball";

    case "soccer":
      return "Soccer";

    case "volleyball":
      return "Volleyball";

    case "rugby":
      return "Rugby";

    case "cricket":
      return "Cricket";

    case "ice-hockey":
      return "Ice Hockey";

    default:
      return folder;
  }
}