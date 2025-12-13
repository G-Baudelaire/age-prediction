type ImageAreaProps = {
  previewUrl: string | null;
};

export function ImageArea({ previewUrl }: ImageAreaProps) {
  return (
    <div className="image-area">
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Uploaded preview"
          className="preview-image" />
      ) : (
        <div className="placeholder">
          <svg
            viewBox="0 0 100 120"
            className="head-outline"
            aria-hidden="true"
          >
            <circle cx="50" cy="35" r="20" fill="none" strokeWidth="3" />
            <line x1="45" y1="55" x2="45" y2="80" strokeWidth="3" />
            <line x1="55" y1="55" x2="55" y2="80" strokeWidth="3" />
            <path d="M25 90 Q50 75 75 90" fill="none" strokeWidth="3" />
          </svg>
          <span className="placeholder-text">No image selected</span>
        </div>
      )}
    </div>
  );
}

