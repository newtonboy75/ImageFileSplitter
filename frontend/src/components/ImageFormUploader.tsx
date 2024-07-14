import { useEffect, useState } from "react";
import ImageTiles from "./ImageTiles";
import Switcher10 from "./Toggler";

const ImageFormUploader = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState("");
  const [imageResults, setImageResults] = useState(null);
  const [colNum, setColNum] = useState<number>(1);
  const [rowNum, setRowNum] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [resetForm, setResetForm] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setImageResults(null);
    setLoading(true);
    setIsToggled(true);
    console.log(rowNum, colNum);

    if (imageFile) {
      fetch(
        `http://localhost:5000/get_file?file_name=${imageName}&rows=${rowNum.toString()}&columns=${colNum.toString()}`
      )
        .then((res) => res.json())
        .then((res) => setImageResults(res))
        .then(() => window.scrollTo(0, 80))
        .finally(() => setLoading(false));
    }
  };

  //display image preview
  const setImageToPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(null);
    setImageName("");
    setImageResults(null);
    setResetForm(false);

    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
      setImageName(e.target.files[0].name);

      let headers = new Headers();
      headers.set("content-type", "multipart/form-data");

      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      fetch("http://localhost:5000/upload_files", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
    }
  };

  //toggle to show grid on image
  const getToggle = (val: boolean) => {
    setIsToggled(val);
  };

  useEffect(() => {
    if (imageFile) {
      setResetForm(true);
    }
  }, [imageFile]);

  useEffect(() => {
    setImageResults(null);
  }, [rowNum, colNum]);

  return (
    <div className="App m-3 p-0">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 h-screen">
        <div className="flex flex-col items-center justify-center w-full h-full">
          {!imageFile && (
            <div>
              <h2 className="font-semibold text-lg">
                Welcome to Image Grid Splitter.
              </h2>{" "}
              <div className="mt-2 mb-2">
                Click to the Upload button to start.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center mb-20">
              <label
                className="mt-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                htmlFor="uploader-btn"
              >
                Upload Image File
              </label>

              <input
                onChange={setImageToPreview}
                type="file"
                accept="image/*"
                hidden
                id="uploader-btn"
                name="file"
                max-size="1048576"
              ></input>

              <div className="p-10">
                {imageFile && (
                  <img src={URL.createObjectURL(imageFile)} alt={imageName} />
                )}
              </div>

              {resetForm && (
                <div className="flex flex-row flex-wrap items-center gap-5">
                  <div className="items-center">
                    <div className="text-center" id="button">
                      <div className="text-xs font-bold mb-1">ROWS</div>
                      <input
                        name="rows"
                        type="number"
                        className="w-20 p-1 border rounded"
                        id="rows"
                        defaultValue="1"
                        max={10}
                        min={1}
                        onChange={(e) => setRowNum(parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="items-center">
                    <div className="text-center" id="button">
                      <div className="text-xs font-bold mb-1">COLUMNS</div>
                      <input
                        name="cols"
                        type="number"
                        className="w-20 p-1 border rounded"
                        id="cols"
                        defaultValue="1"
                        max={10}
                        min={1}
                        onChange={(e) => setColNum(parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="items-center">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded mt-5"
                    >
                      Split Image
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-items-center">
            <div className="p-10">
              {loading && <div>Processing image... please wait...</div>}
              {imageResults && (
                <>
                  <div className="text-center p-3 -mt-12">Splitted Images</div>
                  <ImageTiles
                    images={imageResults}
                    rows={rowNum}
                    cols={colNum}
                    toggled={isToggled}
                  />
                  <Switcher10 sendData={getToggle} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageFormUploader;
