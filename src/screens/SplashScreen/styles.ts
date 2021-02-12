import {StyleSheet} from "react-native";
import {fonts} from "../../styles/constants";
import {colors} from "../../styles/constants";

export default StyleSheet.create({
    backGround: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    splashView: {
        alignSelf: "center",
        justifyContent: "center",
        width: 400,
        height: 400,
        marginTop: 40
    },
    logo: {
        fontFamily: fonts.LOBSTER_REGULAR,
        fontSize: 45,
        color: colors.FRUIT_SALAD,
        opacity: 0.75,
        alignSelf: "center",
    },
});