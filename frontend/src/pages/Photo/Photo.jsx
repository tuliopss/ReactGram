import { Link, useParams } from "react-router-dom";
import Message from "../../components/Message/Message";
import { uploads } from "../../utils/api";
import styles from "./Photo.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotoById, like } from "../../slices/photoSlice";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import LikeContainer from "../../components/LikeContainer/LikeContainer";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

const Photo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  const handleLike = () => {
    dispatch(like(photo._id));

    resetMessage();
  };

  useEffect(() => {
    dispatch(getPhotoById(id));
  }, [dispatch, id]);

  return (
    <div id={styles.photo}>
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className={styles.message_container}>
        {error && <Message msg={error} type='error' />}
        {message && <Message msg={message} type='success' />}
      </div>
    </div>
  );
};

export default Photo;
