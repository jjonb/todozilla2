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

const Home = (props) => {
  const [task, setTask] = useState("");
  const [key, setKey] = useState("");
  const [keys, setKeys] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const db = getDatabase();
  const taskListRef = ref(db, "tasks/" + props.userId);
  const newTaskRef = push(taskListRef);

  const onSubmit = () => {
    if (task === "") {
      return;
    }
    set(newTaskRef, {
      task: task,
    });
    console.log(newTaskRef.key);

    setTask("");
    //props.navigation.goBack();
  };

  const signOut = () => {
    props.userAuth.signOut();
    props.navigation.navigate("Login");
  };

  useEffect(() => {
    return onValue(taskListRef, (snapshot) => {
      if (snapshot.val() !== null) {
        const data = snapshot.val();
        //console.log(data);
        let result = Object.keys(data).map((key) => {
          return { task: data[key].task, id: key };
        });

        setTasks(result);
      } else {
        setTasks([]);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ color: "red" }}>Home</Text>
      <Text>High Score: {highScore}</Text>
      <Text> Current Score:{currentScore}</Text>
      <View>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <Task
              item={item}
              db={db}
              id={item.id}
              userId={props.userId}
              currentScore={currentScore}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <TouchableOpacity onPress={signOut}>
        <Text>Sign Out </Text>
      </TouchableOpacity>
      <TextInput
        onChangeText={(text) => setTask(text)}
        value={task}
        style={styles.input}
        placeholder="What's new?"
      ></TextInput>
      <TouchableOpacity onPress={onSubmit}>
        <Text>Submit </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#Red",
    alignItems: "center",
    justifyContent: "center",
  },
});
