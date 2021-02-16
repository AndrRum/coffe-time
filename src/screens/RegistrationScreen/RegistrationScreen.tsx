import React, {useState, useRef, MutableRefObject} from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import {useDispatch} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import BottomSheet from "reanimated-bottom-sheet";
import ImagePicker from "react-native-image-crop-picker";
import Animated from "react-native-reanimated";
import {Icon} from "react-native-elements";
import {execRequest} from "../../api/ExecuteRequest";
import {createRegisterConfig} from "../../api/AuthUser";
import {saveUser, saveImage} from "../../redux/UserReduser";
import styles from "./styles";
import {images} from "../../styles/images";
import {regProps} from "../../navigation/NavigationStack";
import BottomSheetBehavior from "reanimated-bottom-sheet";

export const RegistrationScreen = (props: regProps) => {
  const navigation = props.navigation;
  const dispatch = useDispatch();
  const refRBSheet = useRef<
    MutableRefObject<BottomSheetBehavior> | undefined | any
  >();
  const fall = new Animated.Value(1);
  const [photo, setPhoto] = useState(images.USER);
  const [mailText, setMailText] = useState("");
  const [pasText, setPasText] = useState("");
  const [repitePasText, setRepitePasText] = useState("");
  const [mailErr, setMailErr] = useState("");
  const [pasErr, setPasErr] = useState("");
  const [repitePasErr, setRepitePasErr] = useState("");
  const [serverErr, setServerErr] = useState("");
  const [emptyValueErr, setEmptyValueErr] = useState("");
  const [passwordSecured, setPasswordSecured] = useState(true);

  const e = (): void => {
    Alert.alert("Не удалось загрузить фото");
  };
  const takePhotoFromGallery = () => {
    ImagePicker.openPicker({
      width: 142,
      height: 142,
      cropping: true,
    })
      .then((photo) => {
        console.log(photo);
        const imageObj = {
          uri: photo.path,
        };
        dispatch(saveImage(photo.path));
        setPhoto(imageObj);
        refRBSheet.current.snapTo(1);
      })
      .catch(e);
  };
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 142,
      height: 142,
      cropping: true,
    })
      .then((photo) => {
        console.log(photo);
        const imageObj = {
          uri: photo.path,
        };
        setPhoto(imageObj);
        dispatch(saveImage(photo.path));
        refRBSheet.current.snapTo(1);
      })
      .catch(e);
  };

  const renderContent = () => (
    <ImageBackground source={images.BOTTOM} style={styles.backBottomImage}>
      <View style={styles.bottomSheet}>
        <TouchableOpacity
          style={styles.galleryPhotoButton}
          onPress={takePhotoFromGallery}>
          <Text style={styles.textGalleryButton}>Фото из галереи</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cameraPhotoButton}
          onPress={takePhotoFromCamera}>
          <Text style={styles.textCameraButton}>Фото с камеры</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );

  const textHandlers = {
    changeLoginHandler: (text: string) => {
      setMailText(text.trim());
    },
    changePasswordHandler: (text: string) => {
      setPasText(text.trim());
    },
    changeRepitePasswordHandler: (text: string) => {
      setRepitePasText(text.trim());
    },
  };
  type typeFields = {
    clearAllTextFields: () => void;
    clearMailField: () => void;
    clearPasswordField: () => void;
    clearRepitePasswordField: () => void;
    clearPasAndRepitePasField: () => void;
  };
  const clearTextFieldsHandler: typeFields = {
    clearAllTextFields: () => {
      setMailText(""), setPasText(""), setRepitePasText("");
    },
    clearMailField: () => {
      setMailText("");
    },
    clearPasswordField: () => {
      setPasText("");
    },
    clearRepitePasswordField: () => {
      setRepitePasText("");
    },
    clearPasAndRepitePasField: () => {
      setPasText(""), setRepitePasText("");
    },
  };
  type typeErrFields = {
    rightData: () => void;
    onlyMailErr: () => void;
    onlyPasErr: () => void;
    onlyRepitePasErr: () => void;
    onlyEmptyValueErr: () => void;
  };
  const clearErrorsFieldsHandler: typeErrFields = {
    rightData: () => {
      setMailErr("");
      setPasErr("");
      setRepitePasErr("");
      setServerErr("");
      setEmptyValueErr("");
    },
    onlyMailErr: () => {
      setPasErr("");
      setRepitePasErr("");
      setServerErr("");
      setEmptyValueErr("");
    },
    onlyPasErr: () => {
      setMailErr("");
      setRepitePasErr("");
      setServerErr("");
      setEmptyValueErr("");
    },
    onlyRepitePasErr: () => {
      setMailErr("");
      setPasErr("");
      setServerErr("");
      setEmptyValueErr("");
    },
    onlyEmptyValueErr: () => {
      setMailErr("");
      setPasErr("");
      setRepitePasErr("");
      setServerErr("");
    },
  };
  const mailString: string = mailText;
  const searchElement = mailString.includes("@");
  const pasLength: number = pasText.length;
  const maxPassword: boolean = pasLength <= 16;
  const minPassword: boolean = pasLength >= 5;
  const rightRepitePas: boolean = pasText === repitePasText;
  const notEmptyValue: boolean =
    mailText !== "" && pasText !== "" && repitePasText !== "";
  const validData: boolean =
    searchElement === true &&
    notEmptyValue &&
    maxPassword &&
    minPassword &&
    rightRepitePas;

  type typeErrors = {
    emptyValue: boolean;
    errMail: boolean;
    errPasswordMaxLength: boolean;
    errPasswordMinLength: boolean;
    errRightRepitePas: boolean;
  };
  const errorsHandler: typeErrors = {
    emptyValue: mailText === "" || pasText === "" || repitePasText === "",
    errMail: searchElement === false,
    errPasswordMaxLength: pasLength > 16,
    errPasswordMinLength: pasLength < 5,
    errRightRepitePas: pasText !== repitePasText,
  };
  type typeMessagesError = {
    errMessageEmptyValue: string;
    errMessageMail: string;
    errMessageMaxPas: string;
    errMessageMinPas: string;
    errMessageRightRepitePas: string;
    errMessageServer: string;
  };
  const errorsMessage: typeMessagesError = {
    errMessageEmptyValue: "Заполните все поля формы",
    errMessageMail: "Некорректный e-mail",
    errMessageMaxPas: "Не более 16 символов",
    errMessageMinPas: "Не менее 5 символов",
    errMessageRightRepitePas: "Пароли не совпадают",
    errMessageServer: "Данные логин и пароль уже использованы",
  };
  const passwordSecuredHandler = (): void => {
    setPasswordSecured(!passwordSecured);
  };
  const onRegisterSuccess = (result: any): void => {
    console.log(result);
    dispatch(saveUser(mailText, pasText, result.data));
    navigation.replace("HomeScreen");
  };
  const onRegisterFailure = (reason: any): void => {
    console.log(reason);
    setServerErr(errorsMessage.errMessageServer);
  };

  const handleButtonPress = (): void => {
    if (validData) {
      execRequest(
        createRegisterConfig({
          email: mailText,
          password: pasText,
        }),
      )
        .then(onRegisterSuccess)
        .catch(onRegisterFailure);
      clearTextFieldsHandler.clearAllTextFields();
      clearErrorsFieldsHandler.rightData();
    }
    if (errorsHandler.emptyValue) {
      setEmptyValueErr(errorsMessage.errMessageEmptyValue);
      clearErrorsFieldsHandler.onlyEmptyValueErr();
    }
    if (errorsHandler.errMail && !errorsHandler.emptyValue) {
      setMailErr(errorsMessage.errMessageMail);
      clearTextFieldsHandler.clearMailField();
      clearErrorsFieldsHandler.onlyMailErr();
    }
    if (errorsHandler.errPasswordMaxLength && !errorsHandler.emptyValue) {
      setPasErr(errorsMessage.errMessageMaxPas);
      clearTextFieldsHandler.clearPasAndRepitePasField();
      clearErrorsFieldsHandler.onlyPasErr();
    }
    if (errorsHandler.errPasswordMinLength && !errorsHandler.emptyValue) {
      setPasErr(errorsMessage.errMessageMinPas);
      clearErrorsFieldsHandler.onlyPasErr();
    }
    if (errorsHandler.errRightRepitePas && !errorsHandler.emptyValue) {
      setRepitePasErr(errorsMessage.errMessageRightRepitePas);
      clearTextFieldsHandler.clearPasAndRepitePasField();
      clearErrorsFieldsHandler.onlyRepitePasErr();
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView enabled>
        <View>
          <ImageBackground source={images.BACKGROUND} style={styles.backImage}>
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(243,233,216,0.79)"]}
              style={styles.linearGradient}>
              <Text style={styles.logo}>CoffeTime</Text>
              <Text style={styles.secLogo}>территория кофе</Text>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    refRBSheet.current.snapTo(0);
                  }}>
                  <Image source={photo} style={styles.imageAvatar} />
                </TouchableOpacity>
              </View>

              <View>
                <View style={styles.mailInputView}>
                  <TextInput
                    style={styles.mailInput}
                    placeholder="Введите e-mail"
                    onChangeText={textHandlers.changeLoginHandler}
                    value={mailText}
                    placeholderTextColor="white"
                  />
                  <Icon
                    color="white"
                    name="user"
                    type="font-awesome"
                    size={25}
                  />
                </View>
                <Text style={styles.errText}>
                  {mailErr}
                  {emptyValueErr}
                </Text>
                <View style={styles.pasInputView}>
                  <TextInput
                    style={styles.pasInput}
                    placeholder="Введите пароль"
                    onChangeText={textHandlers.changePasswordHandler}
                    value={pasText}
                    secureTextEntry={passwordSecured}
                    placeholderTextColor="white"
                  />
                  <TouchableOpacity onPress={passwordSecuredHandler}>
                    <Icon
                      color="white"
                      name="eye"
                      type="font-awesome-5"
                      size={25}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.errText}>
                  {pasErr}
                  {emptyValueErr}
                </Text>
                <View style={styles.pasInputView}>
                  <TextInput
                    style={styles.pasInput}
                    placeholder="Повторите пароль"
                    onChangeText={textHandlers.changeRepitePasswordHandler}
                    value={repitePasText}
                    secureTextEntry
                    placeholderTextColor="white"
                  />
                </View>
                <Text style={styles.errText}>
                  {emptyValueErr}
                  {repitePasErr}
                  {serverErr}
                </Text>
                <TouchableOpacity
                  onPress={handleButtonPress}
                  style={styles.confirmButton}>
                  <Text style={styles.confirmTextButton}>Подтвердить</Text>
                </TouchableOpacity>
                <BottomSheet
                  ref={refRBSheet}
                  renderContent={renderContent}
                  snapPoints={[300, 0]}
                  initialSnap={1}
                  callbackNode={fall}
                  enabledContentGestureInteraction={true}
                />
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
