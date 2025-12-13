import type { ChangeEvent } from "react";
import { useState } from "react";
import { ImageArea } from "./ImageArea";
import { PredictionResult } from "./PredictionResult";
import { UploadButton } from "./UploadButton";

const API_URL: string = "http://localhost:8000/predict/custom"; // 🔹 replace with your actual API endpoint

export default function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<{ age: number; gender: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");


  function handleFileChange(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    if (!file) {
      clearFileState();
    } else if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      clearFileState();
    } else {
      updateFileState(file);
    }
  }

  function clearFileState(): void {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
  }

  function updateFileState(file: File): void {
    setError("");
    setResult(null);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function handlePredictClick() {
    if (!selectedFile) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    await postAndUpdateResult(selectedFile);
    setLoading(false);
  }

  type ApiPrediction = { age: number; gender: "Male" | "Female" };
  async function postAndUpdateResult(selectedFile: File): Promise<void> {
    try {
      const response = await getPredictionResponse(selectedFile);
      const data: ApiPrediction = await response.json();
      throwIfDataInvalid(data);
      setResult({ age: data.age, gender: data.gender });
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  }

  async function getPredictionResponse(selectedFile: Blob): Promise<Response> {
    try {
      const formData = buildForm(selectedFile);
      const response = await postForm(formData);
      checkResponseOk(response);
      return response;
    } catch (err) {
      console.error(err);
      setError(err.message);
      throw err;
    }
  }

  function buildForm(selectedFile: Blob): FormData {
    const formData = new FormData();
    formData.append("image", selectedFile);
    return formData;
  }

  async function postForm(formData: FormData): Promise<Response> {
    const init: RequestInit = { method: "POST", body: formData };
    return await fetch(API_URL, init);
  }

  function checkResponseOk(response: Response): void {
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
  }

  function throwIfDataInvalid(data: ApiPrediction): void {
    const ageIsNotNumber = typeof data.age !== "number";
    const genderIsNotMaleOrFemale = !["Male", "Female"].includes(data.gender);

    if (ageIsNotNumber || genderIsNotMaleOrFemale) {
      throw new Error("Unexpected response format from API.");
    }
  }

  return (
    <div className="app">
      <div className="card">
        <h1>Age &amp; Gender Predictor</h1>
        <p className="subtitle">
          Upload a face photo and click <strong>Predict</strong>.
        </p>

        <ImageArea previewUrl={previewUrl} />
        <UploadButton onChange={handleFileChange} />

        <button
          className="predict-button"
          onClick={handlePredictClick}
          disabled={loading || !selectedFile}
        >
          {loading ? "Predicting..." : "Predict"}
        </button>

        {error && <p className="error-text">{error}</p>}
        {result && (
          <PredictionResult age={result.age} gender={result.gender} />
        )}
      </div>
    </div>
  );
}


