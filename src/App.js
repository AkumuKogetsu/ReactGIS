import React, { useState } from "react";
import Maps from "./Maps";
import SearchBox from "./SearchBox";

function App() {
  const [selectPosition, setSelectPosition] = useState(null);

  console.log(selectPosition);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{ width: "50vw", height: "100vh" }}>
        <Maps selectPosition={selectPosition} />
      </div>
      <div style={{ border: "2px solid grey", width: "50vw" }}>
        <SearchBox
          selectPosition={selectPosition}
          setSelectPosition={setSelectPosition}
        />
      </div>
    </div>
  );
}

export default App;
