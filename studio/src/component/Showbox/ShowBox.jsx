import React from "react";

const ShowBox = ({data}) => { 


  return (
    <div className="stored_images">
      {data?.map((e, i) => (
        <div key={i}>  
          {console.log(e)} 
          {/* <img src={URL.createObjectURL(e.Blob)} alt="" /> */}
        </div> 
      ))}  
      
    </div>
  );
};

export default ShowBox;
