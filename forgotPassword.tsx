import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { BASE_URL } from "../constants/BaseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { router } from "expo-router";

export default function forgotPassword() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  async function doForgotPassword() {
    // Validate the form data
    if (!email) {
      Alert.alert("خطأ", "يجب اضافة جميع الحقول!", [
        { text: "حاضر", onPress: () => console.log(error) },
      ]);
    } else {
      // Make the call to API to send login information
      const response = await fetch(`${BASE_URL}/user/forgotPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      if (!response.ok) {
        Alert.alert("خطأ", await response.json(), [
          { text: "حاضر", onPress: () => console.log(error) },
        ]);
      } else {
        Alert.alert("", await response.json(), [
          { text: "تسجيل الدخول", onPress: () => router.navigate("/login") },
        ]);
      }
    }
  }

  return (
    <SafeAreaView>
      <Text style={styles.paragraph}>استعادة بيانات الدخول</Text>

      <View style={styles.root}>
        <View>
          <Text style={styles.textInput}>البريد الالكتروني</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />

          <View style={styles.loginButtonSection}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => doForgotPassword()}
            >
              <Text style={styles.textColorWhite}>ارسال كلمة المرور</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomAction}>
            <View style={styles.item}>
              <TouchableOpacity>
                <Text
                  style={styles.textColorBrand}
                  onPress={() => router.navigate("/login")}
                >
                  العودة لتسجيل الدخول
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row-reverse",
    backgroundColor: "#f3f3f3",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "right",
  },
  paragraph: {
    fontFamily: "ArFont",
    padding: 20,
    paddingTop: 25,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: '#000',
    color: "#E99D2D"
  },
  root: {
    margin: 20,
    marginTop: 40,
    marginBottom: 0,
    justifyContent: "center",
    textAlign: "right",
  },
  textInput: {
    textAlign: "right",
  },
  input: {
    textAlign: "right",
    backgroundColor: "#fff",
    height: 60,
    borderColor: "#ccc",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 30,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  button: {
    borderColor: "#E99D2D",
    color: "white",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#E99D2D",
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    width: 200,
  },
  loginButtonSection: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  textColorWhite: {
    color: "#ffffff",
  },
  textColorBrand: {
    color: "#E99D2D",
  },
  bottomAction: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 30,
  },
  item: {
    margin: 10,
    height: 30,
  },
});
