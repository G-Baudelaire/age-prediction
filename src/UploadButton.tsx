type UploadButtonProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function UploadButton({ onChange }: UploadButtonProps) {
  return (
    <label className="upload-button">
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        style={{ display: "none" }}
      />
      Choose Image
    </label>
  );
}

