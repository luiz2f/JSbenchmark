import { useSelector } from "react-redux";

function Loading() {
  const { loading, testCodes, iterations, progress } = useSelector(
    (state) => state.codeTest
  );

  return (
    <div>
      {progress} - {testCodes?.length} - {iterations}{" "}
    </div>
  );
}

export default Loading;
