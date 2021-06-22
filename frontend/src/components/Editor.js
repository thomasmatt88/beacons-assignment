import EditLink from "./EditLink";

function Editor({ links, addLink, removeLink, editLink }) {
  return (
    <div className="Editor">
      <h1>Editor</h1>
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <EditLink
              id={link.id}
              title={link.title}
              url={link.url}
              count={link.count}
              onDelete={removeLink}
              onEdit={editLink}
            />
          </li>
        ))}
      </ul>
      <button className="AddButton" onClick={addLink}>
        Add new link
      </button>
    </div>
  );
}

export default Editor;
