import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { ref, update, remove } from "firebase/database";

const Task = (props) => {
  const [text, onChangeText] = useState("");
  const [toggleEdit, setToggleEdit] = useState(false);
  const userScoreRef = ref(props.db, "scores/" + props.userID);

  return (
    <View>
      <TextInput
        autoFocus={true}
        onChangeText={onChangeText}
        value={text}
      ></TextInput>
      <Text>{props.item}</Text>
    </View>
  );
};

export default Task;
