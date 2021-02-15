import {StyleSheet} from "react-native";
import {colors} from "../styles/constants";
import {fonts} from "../styles/constants";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 22,
  },
  backButton: {
    width: "100%",
  },
  imageButton: {
    width: 22,
    height: 22,
  },
  viewHeaderText: {
    width: "100%",
  },
  headerText: {
    alignSelf: "center",
    marginRight: 30,
    fontFamily: fonts.LOBSTER_REGULAR,
    fontSize: 22,
    color: colors.TUNDORA,
  },
});
