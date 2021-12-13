import React from "react";
import { Grid } from "@material-ui/core";
import ImageItem from "./ImageItem";

const ImageSlide = (props) => {

  const { images, img, setAsset, setRemove } = props;

  const deleteFunc = (id) => {
    if (id) {
      setAsset(id);
      setRemove(true);
    }
  }

  if (images.length > 0) {
    return (
      <Grid container>
        {
          images.map((image, index) => 
            <ImageItem
              img={image}
              size={{md: 4}}
              key={index}
              deleteFunc={() => deleteFunc(image.id)}
            />
          )
        }
      </Grid>
    );
  } else {
    return (
      <Grid container justify="center" alignItems="center">
        <ImageItem
          img={img}
          size={{xs: 10}}
          deleteFunc={() => deleteFunc(img.id)}
        />
      </Grid>
    );
  };
};

ImageSlide.defaultProps = {
  images: [],
};

export default ImageSlide;