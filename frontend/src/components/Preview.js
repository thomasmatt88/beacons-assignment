function Preview({ links, onClick }) {
  return (
    <div class="smartphone">
      <div class="content">
        <ul>
          {links
            .filter((link) => link.title && link.url)
            .map((link) => (
              <li key={link.id}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onClick(link.id)}
                >
                  <div className="LinkContainer">{link.title}</div>
                </a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Preview;
