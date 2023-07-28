import { useState } from "react";
import { Button, Text, Textarea } from "@nextui-org/react";
import { db, auth } from "../config/Firebase";
import { collection, serverTimestamp, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Entry = () => {
  const [score, setScore] = useState(0);
  const [textEntry, setTextEntry] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [selectedEmojiIndex, setSelectedEmojiIndex] = useState(null);

  const user = auth.currentUser;
  const entryCollection = collection(db, "Users", user.uid, "Entries");

  const emojis = [
    { emoji: "😁", value: 2 },
    { emoji: "🙂", value: 1 },
    { emoji: "😐", value: 0 },
    { emoji: "☹️", value: -1 },
    { emoji: "😭", value: -2 },
    { emoji: "💀", value: -3 },
  ];

  const handleChange = (value) => {
    setTextEntry(value);
    setWordCount(value.trim().split(/\s+/).filter(Boolean).length);
  };

  const handleEmojiPress = (value, index) => {
    setScore(value);
    setSelectedEmojiIndex(index);
  };

  const showToast = () => {
    toast.success("Your entry has been submitted.", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleSubmit = async (value, note) => {
    const now = serverTimestamp();

    try {
      const entry = {
        datetime: now,
        note,
        value,
      };

      await addDoc(entryCollection, entry);
      setTextEntry("");
      setWordCount("");
      setSelectedEmojiIndex(null);
      showToast();
    } catch (err) {
      console.error("Error pushing data to database: ", err);
    }
  };

  return (
    <div>
      <div className="emojiContainer">
        <Button.Group bordered={false} auto ghost color="gradient" size="xl">
          {emojis.map((emoji, index) => (
            <Button
              key={index}
              onPress={() => handleEmojiPress(emoji.value, index)}
              className={`emojiContainer ${
                selectedEmojiIndex === index ? "selectedEmojiContainer" : ""
              }`}
            >
              <Text
                className={`emoji ${
                  selectedEmojiIndex === index ? "selectedEmoji" : ""
                }`}
              >
                {emoji.emoji}
              </Text>
            </Button>
          ))}
        </Button.Group>
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Textarea
            size="xl"
            bordered
            borderWeight="10"
            width="90%"
            height="300px"
            color="default"
            placeholder="Log your thoughts"
            onChange={(e) => handleChange(e.target.value)}
            className="entryInput"
            helperText="optional"
            helperColor="white"
            value={textEntry}
          />
        </div>
        <Text  css={{color:"white"}} className="wordCount" style={{ textAlign: "right" }}>
          Word Count: {wordCount}
        </Text>
      </div>

      <div className="buttonContainer">
        <Button
          onPress={() => handleSubmit(score, textEntry)}
          title="Submit"
          disabled={selectedEmojiIndex === null}
        >
          Submit
        </Button>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
    </div>
  );
};

export default Entry;
