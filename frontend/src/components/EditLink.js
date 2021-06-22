import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";

function EditLink({ id, title, url, count, onDelete, onEdit }) {
  const [titleText, setTitleText] = useState(title);
  const [urlText, setUrlText] = useState(url);
  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      // press Enter
      onEdit(id, titleText, urlText);
    }
  };

  return (
    <div className="LinkContainer">
      <input
        type="text"
        value={titleText ? titleText : null}
        placeholder="Input Link Title and Press Enter"
        onKeyDown={onKeyDownHandler}
        onChange={(e) => setTitleText(e.target.value)}
      />
      <input
        type="text"
        value={urlText ? urlText : null}
        placeholder="Input Link URL and Press Enter"
        onKeyDown={onKeyDownHandler}
        onChange={(e) => setUrlText(e.target.value)}
      />
      <p className="Views">
        <i>Total Clicks: {count}</i>
      </p>
      <button
        className="DeleteButton"
        onClick={() => {
          onDelete(id);
        }}
      >
        <AiFillDelete size={25} />
      </button>
      {/* prevent overflow after using float */}
      <div style={{ clear: "both" }}></div>
    </div>
  );
}

export default EditLink;
