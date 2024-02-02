import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [box, setBox] = useState([]);
  const [img, setImg] = useState("");
  const [showbox1, setShowbox1] = useState("");
  const [showbox2, setShowbox2] = useState("");

  

  return (
    <div classNameName="App">
      <div>
        <label for="input_file" id="drop_box">
          <input
            type="file" 
            id="input_file"
            accept="image/png, image/jpeg"
            hidden 
          />
          <div className="inner_content">
            <div id="show_selection"></div>
            <div id="in_text">
              <div className="box_icon">
                <img src="./uploadicon.png" id="icon" alt="img" /> 
              </div>
              <p>
                Drag and Drop or click here <br /> 
                to upload image
              </p> 
              <span> Upload (png, jpg or jpeg) image </span>
            </div>
          </div>
          {/* <div id="loading" className="loader" style="display: none"></div> */}
        </label>
      </div>
    </div>
  );
}

export default App;
