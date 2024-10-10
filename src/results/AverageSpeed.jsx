function AverageSpeed({ averageSpeed }) {
  const maxTime = Math.max(...averageSpeed.map((item) => item.averageTime));
  return (
    <>
      <div className="graph-result">
        <h2>Average Speed</h2>
        {averageSpeed?.map((item, index) => {
          const percentage = (item.averageTime / maxTime) * 100; // Calcula a porcentagem
          return (
            <div key={item.name} className="test-avg">
              <h3
                style={{
                  color: `var(--color${index + 1})`,
                }}
              >
                {item.name}
              </h3>
              <div
                className="avg-rect"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: `var(--colorlg${index + 1})`,
                }}
              >
                {item.averageTime.toFixed(4)} ms
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AverageSpeed;
