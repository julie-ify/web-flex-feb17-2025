const Loading = (props) => {
  return (
    <>
      {props.show && (
        <img
          className="spinner"
          src="images/status.png"
          alt="Loading Indicator"
        />
      )}
    </>
  );
}

export default Loading;
