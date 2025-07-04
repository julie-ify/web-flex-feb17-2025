import classnames from "classnames";

const Album = (props) => {
  const albumInfoClass = classnames("album__info", {
    "album__info--explicit": props.collectionExplicitness === "explicit"
  });

  return (
    <article className="album">
      <img className="album__thumbnail" src={props.artworkUrl100} alt="Album" />
      <div className={albumInfoClass}>
        <div className="album__name">{props.collectionName}</div>
        <div className="album__artist">{props.artistName}</div>
      </div>
    </article>
  );
}

export default Album;
