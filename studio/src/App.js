import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import icon from "./Image/uploadicon.png";
import { LuUnfoldHorizontal } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import ShowBox from "./component/Showbox/ShowBox";

function App() {
  const [box, setBox] = useState([]);
  const [present, setPresent] = useState({});
  const [img, setImg] = useState("");
  const [showimgbox, setShowimgbox] = useState("none");
  const [showbox1, setShowbox1] = useState(
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  );
  const [showbox2, setShowbox2] = useState(
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  );
  const [removed, setRemoved] = useState(false);
  const [position, setPosition] = useState(50);
  const [loading, setLoading] = useState(false);
  const [isDraging, setIsDraging] = useState(false);

  const ondragleave = (event) => {
    event.preventDefault();
    setIsDraging(false);
    console.log("leave");
  };

  const ondragover = (event) => {
    event.preventDefault();
    setIsDraging(true);
    event.dataTransfer.dropEffect = "copy";
    console.log("over the box");
  };

  const ondrop = (event) => {
    event.preventDefault(); // Add this line
    setShowimgbox("grid");
    setIsDraging(false);
    const files = event.dataTransfer.files[0];
    setPresent(files);
    setImg(URL.createObjectURL(files));
    console.log(URL.createObjectURL(files));
    if (files.length === 0) {
      return;
    }

    console.log("droped");
  };

  const handlesaveimg = (e) => {
    setShowimgbox("grid");
    if(e?.target?.files[0]){
      setImg(URL.createObjectURL(e?.target?.files[0]) || "");
      console.log(URL.createObjectURL(e?.target?.files[0]));
      setPresent(e?.target?.files[0]);
      setShowbox1("");
      setShowbox2(""); 
    }
  };

  const handleSliderChange = (e) => {
    setPosition(e.target.value);
  };

  const handlebackgroundremover = async (image) => {
    setLoading(true);
    setShowbox1(img);
    console.log(image);

    const formData = new FormData();
    formData.append("image_file", image);
    formData.append("size", "auto");

    const apiKey = "3zJKVvUicmNaoVFV89G3aG69";

    await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
      },
      body: formData,
    })
      .then((reponse) => {
        return reponse.blob();
      })
      .then((blob) => {
        setBox((prev) => [...prev, blob]);
        const url = URL.createObjectURL(blob);
        console.log(url);
        setShowbox2(url);
        setRemoved(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <div className="dropContainer">
        <div className="flexdown">
          <label
            for="input_file"
            id="drop_box"
            onDragOver={ondragover}
            onDragLeave={ondragleave}
            onDrop={ondrop}
          >
            <div className="inner_content">
              <div id="show_selection"></div>
              <div
                style={{ display: `${showimgbox == "none" ? "grid" : "none"}` }}
              >
                <div className="box_icon">
                  <img src={icon} id="icon" alt="img" />
                </div>
                <p>
                  Drag and Drop or click here <br />
                  to upload image
                </p>
                <span> Upload (png, jpg or jpeg) image </span>
              </div>
              <div className="maximg">
                <img
                  src={img}
                  style={{
                    display: `${showimgbox == "none" ? "none" : "grid"}`,
                  }}
                  alt=""
                />
                <input
                  type="file"
                  id="input_file"
                  onChange={(e) => handlesaveimg(e)}
                  accept="image/png, image/jpeg"
                  hidden
                />
              </div>
            </div>
            <div
              id="loading"
              className="loader"
              style={{ display: `${loading ? "block" : "none"}` }}
            ></div>
          </label>

          {/* image */}
          <div className="btn_box">
            <button
              className="remover"
              onClick={() => handlebackgroundremover(present)}
            >
              remove Background
            </button>
            <button className="adder"> Add background image </button>
          </div>
        </div>
      </div>

      <div
        style={{ display: `${removed == true ? "grid" : "none"}` }}
        className="difference_box"
      >
        <main>
          <div className="close">
            <button className="close" onClick={() => setRemoved(false)}>
              <IoClose />
            </button>
          </div>
          <div class="container" style={{ "--position": `${position}%` }}>
            <div class="image-container">
              <img
                id="img_before"
                class="image-before slider-image"
                src={showbox1}
                alt="color photo"
              />
              <img
                id="img_after"
                class="image-after slider-image"
                src={showbox2}
                alt="black and white"
              />
            </div>
            {/* <!-- step="10" --> */}
            <input
              type="range"
              min="0"
              max="100"
              value={position}
              aria-label="Percentage of before photo shown"
              className="slider"
              onChange={(e) => handleSliderChange(e)}
            />
            <div class="slider-line" aria-hidden="true"></div>
            <div class="slider-button" aria-hidden="true">
              <LuUnfoldHorizontal />
            </div>
          </div>
        </main>
      </div> 

      <ShowBox box={box} />  
    </div>
  );
}

export default App;
