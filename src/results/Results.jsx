import { useSelector } from "react-redux";
import { Boxplot } from "./graphs/Boxplot";
import { Violin } from "./graphs/Violin";
import AverageSpeed from "./AverageSpeed";
import { useEffect, useState } from "react";
const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
function Results() {
  const [graph, setGraph] = useState({ w: 300, h: 300 });
  useEffect(() => {
    const handleResize = debounce(() => {
      const width = document.querySelector(".toogle-code").clientWidth;
      const getCSSVariable = (variable) => {
        return getComputedStyle(document.documentElement)
          .getPropertyValue(variable)
          .trim();
      };
      const h = parseInt(getCSSVariable("--graphH"));
      const value = { w: width, h };
      setGraph(value);
    }, 200);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { results } = useSelector((state) => state.codeTest);

  if (!results || !results.boxplot || !results.averageSpeed) {
    return null; // ou um loading spinner
  }

  const { boxplot, averageSpeed } = results;

  return (
    <>
      {
        averageSpeed?.length > 0 ? (
          //
          <section id="results">
            <h1>Results</h1>

            {averageSpeed?.length > 0 ? (
              <AverageSpeed averageSpeed={averageSpeed} />
            ) : (
              ""
            )}
            {boxplot?.length && (
              <>
                <h2>Violin Graph</h2>

                <Violin
                  width={graph.w}
                  height={graph.h}
                  data={boxplot}
                  smoothing={true}
                  bucketNumber={6}
                />
              </>
            )}
            {boxplot?.length && (
              <>
                <h2>Boxplot</h2>
                <Boxplot width={graph.w} height={graph.h} data={boxplot} />
              </>
            )}
          </section>
        ) : (
          ""
        )
        //
      }
    </>
  );
}

export default Results;
