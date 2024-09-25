import { useSelector } from "react-redux";
import { Boxplot } from "./graphs/Boxplot";
import { Violin } from "./graphs/Violin";
import AverageSpeed from "./AverageSpeed";

function Results() {
  const { results } = useSelector((state) => state.codeTest);
  const { boxplot, averageSpeed, scatter } = results;

  return (
    <>
      {
        boxplot?.length && averageSpeed && (
          //
          <section id="results">
            <h1>Results</h1>

            {averageSpeed.length > 0 ? (
              <AverageSpeed averageSpeed={averageSpeed} />
            ) : (
              ""
            )}
            {boxplot?.length && (
              <>
                <h2>Violin Graph</h2>

                <Violin
                  width={500}
                  height={500}
                  data={boxplot}
                  smoothing={true}
                  bucketNumber={6}
                />
              </>
            )}
            {boxplot?.length && (
              <>
                <h2>BoxPlot</h2>
                <Boxplot width={500} height={500} data={boxplot} />
              </>
            )}
          </section>
        )
        //
      }
    </>
  );
}

export default Results;
