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

  const userScoreRef = ref(props.db, "scores/" + props.userId);
  const taskRef = ref(props.db, "tasks/" + props.userId + "/" + props.id);
  const deleteTask = () => {
    remove(taskRef);
  };
  const editTask = (newText) => {
    update(taskRef, { task: newText.target.value });
  };
  const moveEnd = (e) => {
    let temp_value = e.target.value;
    e.target.value = "";
    e.target.value = temp_value;
  };
  return (
    <View style={{ flexDirection: "row" }}>
      <TextInput
        style={{ outline: 0 }}
        autoFocus={false}
        onFocus={(a) => moveEnd(a)}
        onChangeText={onChangeText}
        onBlur={(newText) => editTask(newText)}
        value={text}
      ></TextInput>
      <TouchableOpacity onPress={deleteTask}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Task;
