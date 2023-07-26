import React from "react";
import { Text, Loading } from "@nextui-org/react";
import MoodChart from "./MoodChart";
// import Gauge from "./Gauge";

const Chart = ({ data }) => {
  
  const getEntries = async () => {
    if (!user) return [];
    const q = query(collection(db, "Users", user.uid, "Entries"));
    const querySnapshot = await getDocs(q);
    const entries = [];
    querySnapshot.forEach((doc) => {
      entries.push({ id: doc.id, ...doc.data() });
    });
    entries.sort((a, b) => a.datetime.seconds - b.datetime.seconds);
    return entries;
  };

  
  if (!data) {
    return <Loading />
  }
  return <MoodChart data={data}/>;



  const { chartScores, chartDates, averageScore } = data;

  const getEmoji = (val) => {
    if (val > 1) {
      return "😁";
    } else if (val > 0 && val < 1) {
      return "🙂";
    } else if (val > -1 && val < 0) {
      return "😐";
    } else if (val > -2 && val < -1) {
      return "☹️";
    } else if (val > -3 && val < -2) {
      return "😭";
    } else {
      return "💀";
    }
  };

  return (
    <div className="container">
      <Text className="titleText">Mood over time</Text>
      <MoodChart scores={chartScores} dates={chartDates} />
      {averageScore !== null ? (
        <div className="gaugeContainer">
          {/* <Gauge value={averageScore} /> */}
        </div>
      ) : (
        <Text>Loading...</Text>
      )}
      <div className="textContainer">
        {" "}
        {/* Use className instead of style */}
        <Text className="text">
          Average Mood is: {averageScore} {getEmoji(averageScore)}
        </Text>
        <Text className="text">Number of Entries is: {chartScores.length}</Text>
      </div>
    </div>
  );
};

export default Chart;
