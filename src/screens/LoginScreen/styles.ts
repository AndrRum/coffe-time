import {StyleSheet} from "react-native";
import {fonts} from "../../styles/constants";
import {colors} from "../../styles/constants";

export default StyleSheet.create({
    backImage: {
        height: 667,
        width: 375,
    },
    linearGradient: {
        height: 667,
        width: 375,
    },
    logo: {
        fontFamily: fonts.LOBSTER_REGULAR,
        fontSize: 62,
        color: colors.WHITE,
        alignSelf: "center",
        marginTop: 80,
        marginRight: 14,
        textShadowColor: colors.BLACK_SHADOW,
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
    },
    secLogo: {
        fontFamily: fonts.SFUI_LIGHT,
        fontSize: 16,
        color: colors.WHITE,
        marginLeft: 157,
        marginTop: -31,
        textShadowColor: colors.BLACK_SHADOW,
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
    },
    mailInputView: {
        flexDirection: "row",
        backgroundColor: colors.TRANSPARENT_BROWN, 
        paddingHorizontal: 10,
        height: 44,
        width: 300,
        display: "flex",
        alignItems: "center",
        borderRadius: 8,
        marginLeft: 30,
        marginTop: 76
    },
    textMailInput: {
        fontSize: 16,
        color: colors.WHITE,
        fontFamily: fonts.SFUI_MEDIUM,
        flex: 1, 
        paddingHorizontal: 12,
    },
    pasInputView: {
        flexDirection: "row",
        backgroundColor: colors.TRANSPARENT_BROWN, 
        paddingHorizontal: 10,
        height: 44,
        width: 300,
        display: "flex",
        alignItems: "center",
        borderRadius: 8,
        marginLeft: 30,
    },
    textPasInput: {
        fontSize: 16,
        color: colors.WHITE,
        fontFamily: fonts.SFUI_MEDIUM,
        flex: 1, 
        paddingHorizontal: 12,
    },
    confirmButton: {
        margin: 18,
        marginLeft: 30,
        backgroundColor: colors.PINE_GLADE,
        borderRadius: 100,
        width: 300,
        height: 52,
    },
    confirmTextButton: {
        color: colors.WHITE,
        alignSelf: "center",
        marginTop: 10,
        fontSize: 22,
        fontFamily: fonts.SFUI_MEDIUM,
    },
    regButton: {
        marginBottom: 25,
        marginLeft: 30,
        backgroundColor: colors.PINE_GLADE,
        borderRadius: 100,
        width: 300,
        height: 52,
    },
    regTextButton: {
        color: colors.WHITE,
        alignSelf: "center",
        marginTop: 10,
        fontSize: 22,
        fontFamily: fonts.SFUI_MEDIUM,
    },
    FBAll: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    buttonFB: {
        marginTop: 40,
        marginLeft: 30,
        backgroundColor: colors.CHAMBRAY,
        borderRadius: 100,
        width: 300,
        height: 52,
    },
    textButtonFB: {
        color: colors.WHITE,
        alignSelf: "center",
        fontSize: 18,
        fontFamily: fonts.SFUI_MEDIUM,
        marginRight: 28,
        marginTop: 10,
    },
    imageFB: {
        marginTop: 13,
        marginLeft: 30,
        alignSelf: "center",
    },
    errText: {
        color: colors.WELL_READ,
        alignSelf: "center",
        fontFamily: fonts.SFUI_MEDIUM,
        fontSize: 12,
        width: 300,
    },
});