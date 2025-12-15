type PredictionResultProps = {
  age: number;
};

export function PredictionResult({ age }: PredictionResultProps) {
  return (
    <div className="result">
      <h2>Prediction</h2>
      <p>
        <strong>Age:</strong> {age}
      </p>
    </div>
  );
}

