import PropTypes from "prop-types";

import { ImageList, ImageListItem } from "@mui/material";

export const ImageGallery = ({ images }) => {
  return (
    <ImageList
      sx={{
        width: "100%",
        height: "auto",
        "::-webkit-scrollbar": { display: "none" },
      }}
      cols={4}
      rowHeight="auto"
    >
      {images.map((image) => (
        <ImageListItem key={image}>
          <img
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt="Note Image"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
