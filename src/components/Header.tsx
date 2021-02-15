import * as React from "react";
import {View, Text, Image} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native";
import styles from "./styles";
import {images} from "../styles/images";

export const Header = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.replace("LoginScreen");
          }}
          style={styles.backButton}>
          <Image
            style={styles.imageButton}
            source={images.ICON_BACK_CLICK}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.viewHeaderText}>
        <Text style={styles.headerText}>CoffeTime</Text>
      </View>
    </View>
  );
};
