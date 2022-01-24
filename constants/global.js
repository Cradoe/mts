import { Dimensions } from "react-native";

export const globalConstants = {
  PRIMARY_COLOR: "#0033ff",
  SECONDARY_COLOR: "#F46D3E",
  SCREEN_BG: "#F9F9FA",
  SCREEN_HEIGHT: Dimensions.get( "screen" ).height,
  SCREEN_WIDTH: Dimensions.get( "screen" ).width,
  POST_HEADER: {
    method: "POST"
  },
  GET_HEADER: {
    method: "GET"
  }
};
