import * as React from "react";
import {View, Text, Image} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native";
import styles from "./styles";

export const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButton}>
          <Image
            style={styles.imageButton}
            source={require("../assets/pictures/icon_back_click.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.viewHeaderText}>
        <Text style={styles.headerText}>CoffeTime</Text>
      </View>
    </View>
  );
};
