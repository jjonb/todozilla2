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
  const [tasks, setTasks] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [scoreBoard, setScoreBoard] = useState({});

  const db = getDatabase();
  const taskListRef = ref(db, "tasks/" + props.userId);
  const userScoreRef = ref(db, "scores/" + props.userId);
  const userScoresRef = ref(db, "scores/");

  const newTaskRef = push(taskListRef);

  const onSubmit = () => {
    if (task === "") {
      return;
    }
    set(newTaskRef, {
      task: task,
    });

    setTask("");
  };

  const signOut = () => {
    props.userAuth.signOut();
    props.navigation.navigate("Login");
  };

  useEffect(() => {
    return onValue(userScoresRef, (snapshot) => {
      if (snapshot.val() !== null) {
        const data = snapshot.val();
        //console.log(data);
        let result = Object.keys(data).map((key) => {
          return { score: data[key].score, id: key }; //{ task: data[key].task, id: key };
        });
        setScoreBoard(result);
        let maxIndex = 0;
        let max = 0;
        for (let i = 0; i < result.length; i++) {
          if (result[i].score >= max) {
            max = result[i].score;
            maxIndex = i;
          }
        }

        setHighScore(max);
      } else {
        setScoreBoard({});
        setHighScore(0);
      }
    });
  }, []);

  useEffect(() => {
    return onValue(userScoreRef, (snapshot) => {
      if (snapshot.val() !== null) {
        const data = snapshot.val();
        //console.log(data);
        let result = Object.keys(data).map((key) => {
          return data[key]; //{ task: data[key].task, id: key };
        });
        //  console.log(result[0]);
        setCurrentScore(result[0]);
      } else {
        setCurrentScore(0);
      }
    });
  }, []);

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
      <Text> Current Score: {currentScore}</Text>
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
              setCurrentScore={setCurrentScore}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      <TextInput
        onChangeText={(text) => setTask(text)}
        value={task}
        style={styles.input}
        placeholder="What's new?"
      ></TextInput>
      <TouchableOpacity onPress={onSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.navigation.navigate("Scores")}>
        <Text>Go to LeaderBoard</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={signOut}>
        <Text>Sign Out</Text>
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
