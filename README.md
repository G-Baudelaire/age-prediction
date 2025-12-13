# Age & Gender Prediction (Frontend)

React + TypeScript single-page app for predicting a person’s **age** and **gender** from a face photo.  
This project is a **frontend only** and expects an external API to perform the actual prediction.

> 🧠 The backend / ML model is **not** included here — you plug in your own API.

---

## Features

- 📷 Upload a face image from your device
- 👀 See a live preview of the selected image
- 📡 Send the image to a prediction API via `fetch`
- 📊 Display the predicted **age** and **gender**
- ⚠️ User-friendly error messages for:
  - No image selected
  - Invalid file type (non-image uploads)
  - Network / server errors
  - Unexpected API responses

---

## Tech Stack

- **React** 19
- **TypeScript**
- **Vite** (bundler & dev server)
- **ESLint** for linting
- Plain **CSS** for styling (`App.css`, `index.css`)

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/G-Baudelaire/age-and-gender-prediction.git
cd age-and-gender-prediction
````

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the API endpoint

By default, the app points to a local backend URL:

```ts
// src/App.tsx
const API_URL: string = "http://localhost:8000/predict/custom"; 
// replace with your actual API endpoint
```

Update `API_URL` to match your backend if it’s running elsewhere.

The app expects the API to:

* Accept a `POST` request with `multipart/form-data`
* Contain a single field named **`image`**
* Return JSON shaped like:

```json
{
  "age": 27,
  "gender": "Male"
}
```

Where:

* `age` is a **number**
* `gender` is either **"Male"** or **"Female"**

Any other shape or values will trigger an error message:

> `Unexpected response format from API.`

### 4. Run the dev server

```bash
npm run dev
```

Vite will print a local URL (usually `http://localhost:5173`) — open it in your browser.

---

## Available Scripts

Defined in `package.json`:

* **`npm run dev`**
  Start the Vite development server.

* **`npm run build`**
  Build the app for production into the `dist` folder.

* **`npm run preview`**
  Preview the production build locally.

* **`npm run lint`**
  Run ESLint over the project.

There is also a convenience script:

```bash
./build.sh
```

Which simply runs:

```bash
npm install
npm run build
```

(Useful for basic CI or deployment hooks.)

---

## How It Works (Frontend Flow)

Main pieces in `src/`:

* **`main.tsx`**
  React entry point; renders the `<App />` component and imports global styles.

* **`App.tsx`**

  * Manages all main UI state:

    * `selectedFile`
    * `previewUrl`
    * `result` (`{ age, gender }`)
    * `loading` / `error`
  * Validates uploads:

    * Requires an image file (`file.type.startsWith("image/")`)
  * Sends the selected file to `API_URL` using `fetch` and `FormData`
  * Handles errors (HTTP errors, invalid JSON shape, etc.)
  * Renders:

    * Title + subtitle
    * `<ImageArea />` for preview
    * `<UploadButton />` to choose an image
    * Predict button
    * Error and result sections

* **`ImageArea.tsx`**

  * Shows:

    * The preview image if `previewUrl` is set
    * A visual placeholder (“No image selected”) otherwise

* **`UploadButton.tsx`**

  * Wrapper around a file input
  * Calls `onChange` when a user chooses a file

* **`PredictionResult.tsx`**

  * Displays the prediction:

    * `Age: <age>`
    * `Gender: <gender>` (with pretty capitalization)

* **`App.css` / `index.css`**

  * Layout and look & feel:

    * Centered card
    * Dark background
    * Rounded buttons and image area
    * Basic typography

---

## Example API Contract

To integrate with this frontend, your backend could look something like:

1. **Request**

   * `POST /predict/custom`
   * Headers: `Content-Type: multipart/form-data`
   * Body: form field named **`image`**

2. **Response (success)**

   ```json
   {
     "age": 32,
     "gender": "Female"
   }
   ```

3. **Response (error)**

   * Any non-2xx status will be surfaced as:

     * `Server error: <status code>` in the UI.

---

## Deployment

Because this is a static React/Vite app, you can deploy the built `docs` folder
to any static hosting service, such as:

* GitHub Pages

* Vercel

* Netlify

* Any static web server / CDN

Build project using convenience script.

```bash
./build.sh
# Upload /dist to your hosting provider
```

Make sure your deployed frontend’s `API_URL` points to a **publicly reachable** backend.

---

## Notes & Limitations

This project is intended as a **demo / educational frontend**.

Age and gender prediction from images is inherently **imprecise** and may
reflect biases present in the underlying model and training data.

* Do **not** use this project for:

  * Real-world decision-making

  * Any application that could impact rights, access to services, or sensitive outcomes

---

## License

