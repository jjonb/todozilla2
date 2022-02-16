import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    createUserWithEmailAndPassword(props.userAuth, email, password);
  };

  const login = () => {
    signInWithEmailAndPassword(props.userAuth, email, password);
  };

  useEffect(() => {
    if (props.userId !== "") {
      props.navigation.navigate("Home");
    } else {
      setEmail("");
      setPassword("");
    }
  }, [props.userId]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity onPress={login}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={register}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
