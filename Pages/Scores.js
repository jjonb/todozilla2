import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import Task from "./Task.js";

const Scores = (props) => {
  return (
    <View>
      <Text>Scores</Text>
    </View>
  );
};

export default Scores;
