import React, { useEffect } from "react";
import styles from "./Home.module.css";
import LikeContainer from "../../components/LikeContainer/LikeContainer";
import Photo from "../Photo/Photo";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";
import { getPhotos, like } from "../../slices/photoSlice";
import { BsFillEyeFill } from "react-icons/bs";
const Home = () => {
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  const handleLike = (photo) => {
    dispatch(like(photo._id));
    resetMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }
  return (
    <div id={styles.home}>
      {photos &&
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            {/* <Link className={styles.btn} to={`/photos/${photo._id}`}> */}
            {/* <Link className='btn' to={`/photos/${photo._id}`}>
              Ver mais
            </Link> */}
            <Link className={styles.btn} to={`/photos/${photo._id}`}>
              Ver mais
            </Link>
          </div>
        ))}

      {photos.length === 0 && (
        <h2 className={styles.no_photos}>
          Sem fotos cadastradas...{" "}
          <Link to={`/users/${user._id}`}>Poste sua foto aqui</Link>
        </h2>
      )}
    </div>
  );
};

export default Home;
