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
  const [toggleEdit, setToggleEdit] = useState(false);
  const [complete, setComplete] = useState(false);
  const userScoreRef = ref(props.db, "scores/" + props.userId);
  const taskRef = ref(props.db, "tasks/" + props.userId + "/" + props.id);

  const deleteTask = () => {
    if (complete) {
      update(userScoreRef, { score: props.currentScore + 1 });
      props.setCurrentScore(props.currentScore + 1);
    }
    remove(taskRef);
  };
  const editTask = (newText) => {
    update(taskRef, { task: newText.target.value });
    setToggleEdit(!toggleEdit);
  };
  return (
    <View style={{ flexDirection: "row" }}>
      {toggleEdit ? (
        <TextInput
          style={{ outline: 0, width: 150 }}
          autoFocus={true}
          onChangeText={onChangeText}
          onBlur={(newText) => editTask(newText)}
          value={text}
        ></TextInput>
      ) : (
        <Pressable
          style={{ width: 150 }}
          onPress={() => setToggleEdit(!toggleEdit)}
        >
          <Text style={{ marginRight: 10 }}>{text}</Text>
        </Pressable>
      )}

      <TouchableOpacity
        style={{ paddingRight: 10 }}
        onPress={() => {
          setComplete(!complete);
        }}
      >
        {complete ? <Text>☑</Text> : <Text>☐</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={deleteTask}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Task;
