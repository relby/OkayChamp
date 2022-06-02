export type Units = "metric" | "imperial";

export const convertUnits = (units: Units): string => {
  switch (units) {
    case "metric":
      return "°C";
    case "imperial":
      return "°F";
  }
};
