import React from "react";

const ShowBox = ({data}) => { 


  return (
    <div className="stored_images">
      {data?.map((e, i) => (
        <div>
          <img src={URL.createObjectURL(e)} alt="" />
        </div> 
      ))}  
      
    </div>
  );
};

export default ShowBox;
