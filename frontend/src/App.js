import uuid from "react-uuid";
import axios from "axios";
import "./styles.css";
import useFetch from "./useFetch";
import Editor from "./components/Editor";
import Preview from "./components/Preview";

export default function App() {
  // custom hook for fetching data
  //fetch("http://localhost:5000/api/v1/links") REQUIRES CORS headers on backend
  const {
    error,
    setError,
    data: links,
    setData: setLinks,
  } = useFetch("/api/v1/links");

  function addLink() {
    const id = uuid();
    const new_link = {
      id: id,
      title: "",
      url: "",
    };
    axios
      .post(`/api/v1/links/${id}`, new_link)
      .then((res) => {
        //update UI state on success
        setLinks((prevLinks) => [...prevLinks, new_link]);
      })
      .catch((e) => {
        console.log(e);
        setError("Error Adding Link");
      });
  }

  function removeLink(id) {
    let index = links.findIndex((i) => i.id === id);
    if (index >= 0) {
      axios
        .delete(`/api/v1/links/${id}`)
        .then((res) => {
          //update UI state on success
          setLinks((links) => {
            const copy = [...links];
            copy.splice(index, 1);
            return copy;
          });
        })
        .catch((e) => {
          console.log(e);
          setError("Error Removing Link");
        });
    }
  }

  function editLink(id, title, url) {
    let index = links.findIndex((i) => i.id === id);
    const edited_link = {
      id: id,
      title: title,
      url: url,
    };
    if (index >= 0) {
      axios
        .put(`/api/v1/links/${id}`, edited_link)
        .then((res) => {
          setLinks((links) => {
            const copy = [...links];
            copy[index] = edited_link;
            return copy;
          });
        })
        .catch((e) => {
          console.log(e);
          setError("Error Editing Link");
        });
    }
  }

  function incrementClickCount(id) {
    axios.put(`/api/v1/counts/${id}`).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  }

  return (
    <div className="App">
      {error && <div> ERROR COMMUNICATING WITH SERVER: {error} </div>}
      {!error && (
        <Editor
          links={links}
          addLink={addLink}
          removeLink={removeLink}
          editLink={editLink}
        />
      )}
      {!error && <Preview links={links} onClick={incrementClickCount} />}
    </div>
  );
}
