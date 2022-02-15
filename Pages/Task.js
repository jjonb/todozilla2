import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { ref, update, remove } from "firebase/database";

const Task = (props) => {
  const [text, onChangeText] = useState(props.item.task);

  const userScoreRef = ref(props.db, "scores/" + props.userID);

  return (
    <View style={{ flexDirection: "row" }}>
      <TextInput
        style={{ outline: 0 }}
        autoFocus={false}
        onChangeText={onChangeText}
        value={text}
      ></TextInput>
      <TouchableOpacity>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Task;
