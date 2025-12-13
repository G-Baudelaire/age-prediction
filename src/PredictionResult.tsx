type PredictionResultProps = {
  age: number;
  gender: string;
};

export function PredictionResult({ age, gender }: PredictionResultProps) {
  const prettyGender = gender.charAt(0).toUpperCase() + gender.slice(1);

  return (
    <div className="result">
      <h2>Prediction</h2>
      <p>
        <strong>Age:</strong> {age}
      </p>
      <p>
        <strong>Gender:</strong> {prettyGender}
      </p>
    </div>
  );
}

