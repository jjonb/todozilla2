import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";

const Scores = (props) => {
  const db = getDatabase();
  const userScoresRef = ref(db, "scores/");
  const [scoreBoard, setScoreBoard] = useState({});
  useEffect(() => {
    return onValue(userScoresRef, (snapshot) => {
      if (snapshot.val() !== null) {
        const data = snapshot.val();
        let result = Object.keys(data)
          .map((key) => {
            return { score: data[key].score, id: key };
          })
          .sort((a, b) => {
            return b.score - a.score;
          });
        setScoreBoard(result);
      } else {
        setScoreBoard({});
      }
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Leaderboard</Text>
      <View>
        <FlatList
          data={scoreBoard}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row" }}>
              <Text>{scoreBoard.indexOf(item) + 1}) </Text>
              <Text>{item.id.slice(0, 5)} </Text>
              <Text style={{ color: "red" }}>{item.score}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Scores;
