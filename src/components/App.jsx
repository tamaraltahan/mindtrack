import { useState, useEffect } from "react";
import Banner from "./Banner";
import Authenticator from "./Authenticator";
import { auth, db } from "../config/Firebase";
import { query, getDocs, collection } from "firebase/firestore";
import { Loading } from "@nextui-org/react";

export default function App() {
  const [logged, setLogged] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLogged(user !== null);
    });
  
    // cleanup subscription
    return () => unsubscribe();
  }, []);
  

  useEffect(() => {
    const fetchData = async () => {
      const entries = await getEntries(user);
      setData(entries);
    };
    fetchData();
    setLoading(false);
  }, [logged, user]);

  const getEntries = async () => {
    if (!user) return [];
    const q = query(collection(db, "Users", user.uid, "Entries"));
    const querySnapshot = await getDocs(q);
    const entries = [];
    querySnapshot.forEach((doc) => {
      entries.push({ id: doc.id, ...doc.data() });
    });
    return entries;
  };

  return (
    <div className="landingContainer">
      {(logged === true && user !== null)  ? (
        <div>{loading ? <Loading /> : <Banner data={data} />}</div>
      ) : (
        <div>
          <Authenticator setUser={setUser}/>
        </div>
      )}
    </div>
  );
}

// stashing here for preservation

/*

    const getEntries = async () => {
      if (logged) {
        const user = auth.currentUser;
        const q = query(collection(db, "Users", user.uid, "Entries"));
        try {
          const querySnapshot = await getDocs(q);
          const entriesData = [];
          querySnapshot.forEach((doc) => {
            entriesData.push({id: doc.id, ...doc.data()});
          });

          const convertedEntries = entriesData.map((entry) => {
            const datetime = new Date(entry.datetime.seconds * 1000);
            const localDatetime = datetime.toLocaleString();
            return {
              ...entry,
              datetime: localDatetime,
            };
          });

          convertedEntries.sort((a, b) => {
            return new Date(a.datetime) - new Date(b.datetime);
          });

          const chartDates = convertedEntries.map((entry) => entry.datetime);
          const chartScores = convertedEntries.map((entry) => entry.value);
          const averageScore = getAverageScore(
            convertedEntries.map((entry) => entry.value)
          );
          const notes = convertedEntries.map((entry) => entry.note);

          setChartData({
            chartScores,
            chartDates,
            averageScore,
            notes,
          });
          setLoading(false);
        } catch (err) {
          console.error(err);
        }
      }
    };
    */
