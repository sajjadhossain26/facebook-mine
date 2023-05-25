import React from "react";
import "./QuickEdit.css";

const QuickEdit = ({ hide, data, data2, save }) => {
  return (
    <>
      <div className="quick-edit">
        {data && (
          <textarea
            placeholder={data.placeholder}
            onChange={(e) => data.setData(e.target.value)}
          >
            {data2 ? "" : data.data}
          </textarea>
        )}

        {data2 && (
          <textarea
            placeholder={data2.placeholder}
            onChange={(e) => data2.setData(e.target.value)}
          ></textarea>
        )}
        <div className="quick-status">
          <div className="status">
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/HgfBXTEArfp.png?_nc_eui2=AeESLLgzneo1R6z5mCpcbpDYc6lHD9kG4H5zqUcP2Qbgfo0MdGXddbJLJlakbjjL9QQWE2TuUlBgjL0mM6_qOBN0"
              alt=""
            />
            <p>Public </p>
          </div>
          <div className="quick-btn">
            <button className="quick-cancel" onClick={() => hide(false)}>
              Cancel
            </button>
            <button onClick={save}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickEdit;
