import React from "react";
import { uploads } from "../../utils/api";
import { Link } from "react-router-dom";
import styles from "./PhotoItem.module.css";

const PhotoItem = ({ photo }) => {
  return (
    <div className={styles.photo_item}>
      {photo.image && (
        <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
      )}
      <h2>{photo.title}</h2>
      <p className={styles.photo_author}>
        Publicada por:{" "}
        <Link to={`/users/${photo.userId}`}>{photo.userName}</Link>
      </p>
    </div>
  );
};

export default PhotoItem;
