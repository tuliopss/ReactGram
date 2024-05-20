import { Link, useParams } from "react-router-dom";
import Message from "../../components/Message/Message";
import { uploads } from "../../utils/api";
import styles from "./Photo.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotoById } from "../../slices/photoSlice";
import PhotoItem from "../../components/PhotoItem/PhotoItem";

const Photo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  useEffect(() => {
    dispatch(getPhotoById(id));
  }, [dispatch, id]);
  return (
    <div id={styles.photo}>
      <PhotoItem photo={photo} />
    </div>
  );
};

export default Photo;
