import React from "react";
import {View, StyleSheet, Text, Image} from "react-native";
import {useSelector} from "react-redux";
import {IReduxState} from "../redux/UserReduser"


export const HomeScreen = () => {
    let fukk = useSelector((state: IReduxState) => state.sessionId);
    let fukkk = useSelector((state: IReduxState) =>state.login);
    let fuck = useSelector((state: IReduxState) => state.password);
    let fuk = useSelector((state: IReduxState) => state.imagePath);

    console.log (`Sessia: ${fukk}`)
    console.log (`Log: ${fukkk}`)
    console.log (`Pas: ${fuck}`)
    console.log (`Image: ${fuk}`)


    return (
        <View style={styles.NGAll}>
             <Text>Пикча {fuk}</Text>
             <Image source={{uri: fuk}}
                    style={styles.photo}
            />
            <Text>Путин помоги {fukk}</Text>
            <Text>Путин помоги {fukkk}</Text>
            <Text>Путин помоги {fuck}</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    NGAll: {
        
    },
    photo: {
        height: 300,
        width: 300
    }
});