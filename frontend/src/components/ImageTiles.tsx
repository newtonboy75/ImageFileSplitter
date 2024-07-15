import { ItemVariants } from "../types/types";

const ImageTiles = (props: {
  images: any;
  rows: number;
  cols: number;
  toggled: boolean;
}) => {
  const { images, rows, cols, toggled } = props;

  const Tiles = () => {
    let imageElement = [];
    let size = rows * cols;

    

    const columnVariants: ItemVariants = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      7: "grid-cols-7",
      8: "grid-cols-8",
      9: "grid-cols-9",
      10: "grid-cols-10",
    };

    
    const toggleValue: ItemVariants = {
      0: "border-0",
      1: "border-2",
    };

    let togglerVal = toggled ? 0 : 1;

    for (let i = 0; i < size; i++) {
      const timestamp = Math.random();
      let imageUri =
        "http://localhost:5000" + images[i] + "?timestamo=" + timestamp;
      imageElement.push(
        <img
          className={`${toggleValue[togglerVal]}`}
          key={Math.random()}
          src={imageUri}
        />
      );
    }

    let div = (
      <div className={`bg-gray-300 grid ${columnVariants[cols]}`}>
        {imageElement}
      </div>
    );

    size = 0;
    imageElement = [];
    return div;
  };

  return <Tiles />;
};

export default ImageTiles;
