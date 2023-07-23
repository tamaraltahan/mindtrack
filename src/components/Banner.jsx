import React, { useState } from "react";
import Entry from "./Entry";
import Chart from "./Chart";
import History from "./History";
import Authenticator from "./Authenticator";
import { Button, Text } from "@nextui-org/react";

const Banner = ({ data }) => {
  const [activeTab, setActiveTab] = useState("New Entry");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const renderSelectedComponent = () => {
    if (activeTab === "New Entry") {
      return <Entry />;
    } else if (activeTab === "Chart") {
      return <Chart data={data} />;
    } else {
      return <History data={data} />;
    }
  };

  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex" }}>
        <Button
          flat
          bordered={activeTab === "New Entry"}
          onClick={() => handleTabChange("New Entry")}
          style={{ flex: 1, justifyContent: "center", height:50 }}
          css={{borderRadius:0}}
        >
          New Entry
        </Button>
        <Button
          flat
          bordered={activeTab === "Chart"}
          onClick={() => handleTabChange("Chart")}
          style={{ flex: 1, justifyContent: "center", height:50 }}
          css={{borderRadius:0}}
        >
          Chart
        </Button>
        <Button
          flat
          bordered={activeTab === "History"}
          onClick={() => handleTabChange("History")}
          style={{ flex: 1, justifyContent: "center" , height:50}}
          css={{borderRadius:0}}
        >
          History
        </Button>
      </div>
      <Authenticator />
      <div style={{ flex: 1, marginTop: 50 }}>{renderSelectedComponent()}</div>
    </div>
  );
};

export default Banner;
