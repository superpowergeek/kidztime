import React, { Fragment, useEffect, useState } from "react";
import { makeStyles, Button, IconButton, Hidden } from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { DeleteDialog, RenderGuard, SectionPaper, Slideshow } from "components";
import { CreateGalleryImg, ImageSlide } from "./components";
import clsx from "clsx";
import NoImages from "assets/images/not-found/no-images.png";
import useApi from "utils/api/useApi";

const useStyles = makeStyles(theme => ({
  root: {},
  paper: {
    position: "relative",
  },
  noImg: {
    maxWidth: 200,
    display: "block",
    margin: "0 auto",
  },
  caption: {
    marginTop: 18,
    textAlign: "center",
  },
  captionBox: {
    margin: theme.spacing(3, 0),
  },
  smallBtn: {
    display: "block",
    margin: "16px auto 0px",
    "&:hover": {
      backgroundColor: "rgba(33, 33, 33, 0.1)",
    },
  },
}));

let mounted = false;

const ImageGallery = (props) => {

  const { className, model, setModel } = props;

  const api = useApi();
  const classes = useStyles();

  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState(false);
  const [images, setImages] = useState([]);
  const [asset, setAsset] = useState(-1);

  useEffect(() => {
    mounted = true;
    let img = model?.images || [];
    let temparray, tempImg = [];
    if (img.length > 0) {
      for (let i = 0; i < img.length; i += 3) {
        temparray = img.slice(i, i + 3);
        tempImg.push(temparray);
      }
    }
    mounted && setImages(tempImg);
    return () => mounted = false;
  }, [model]);

  const del = () => {
    if (model && asset) {
      let params = {
        product_id: model.id,
        asset_id: asset,
      };
      return api.path("product/gallery/delete", params).del();
    }
  };

  const handleClose = (result = false) => {
    if (!result?.target) {
      setModel({
        ...model,
        images: model.images.filter((each) => each.id !== asset),
      });
    }
    setAsset(-1);
    setRemove(false);
  }

  return (
    <Fragment>
      <div className={clsx(className, classes.root)}>
        <SectionPaper className={classes.paper} title="Image Gallery"
          button={
            <IconButton onClick={() => setAdd(true)}>
              <AddCircleIcon />
            </IconButton>
          }
        >

          <RenderGuard renderIf={images.length > 0}>
            <Hidden smDown>
              <Slideshow>
                {
                  images.length > 0 ?
                    images.map((each, index) =>
                      <ImageSlide
                        images={each}
                        key={index}
                        setRemove={setRemove}
                        setAsset={setAsset}
                      />
                    ) :
                    null
                }
              </Slideshow>
            </Hidden>
            <Hidden mdUp>
              <Slideshow>
                {
                  model ?
                    model.images.map((img, id) =>
                      <ImageSlide
                        img={img}
                        key={id}
                        setRemove={setRemove}
                        setAsset={setAsset}
                      />
                    ) :
                    null
                }
              </Slideshow>
            </Hidden>
          </RenderGuard>
          <RenderGuard renderIf={images.length <= 0}>
            <div className={classes.captionBox}>
              <img alt="" src={NoImages} className={classes.noImg} />
              <div className={classes.caption}>Hmm it seems you have no images in your gallery.</div>
              <Button className={classes.smallBtn} onClick={() => setAdd(true)}>Add Image</Button>
            </div>
          </RenderGuard>
        </SectionPaper>
      </div>
      <CreateGalleryImg
        open={add}
        handleClose={() => setAdd(false)}
        model={model}
        setModel={setModel}
      />
      <DeleteDialog
        name="Image"
        open={remove}
        handleClose={handleClose}
        del={del}
      />
    </Fragment>
  );
};

export default ImageGallery;