import styles from "./Search.module.css";
import { useEffect } from "react";
import { uploads } from "../../utils/api";
import { Link, useParams } from "react-router-dom";
import Message from "../../components/Message/Message";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import { useQuery } from "../../hooks/useQuery";
import { like, searchPhotos } from "../../slices/photoSlice";
import LikeContainer from "../../components/LikeContainer/LikeContainer";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { photos, loading, error } = useSelector((state) => state.photo);

  const resetMessage = useResetComponentMessage(dispatch);
  useEffect(() => {
    dispatch(searchPhotos(search));
  }, [dispatch, search]);

  const handleLike = (photo) => {
    dispatch(like(photo._id));
    resetMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }
  return (
    <div id={styles.search}>
      Você está buscando por: {search}
      {photos &&
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />

            <Link className={styles.btn} to={`/photos/${photo._id}`}>
              Ver mais
            </Link>
            {error && <Message msg={error} type='error' />}
          </div>
        ))}
      {photos.length === 0 && (
        <h2 className={styles.no_photos}>
          Não foram encontrados resultados para {search}
        </h2>
      )}
    </div>
  );
  //   return <div>Search {search}</div>;
};

export default Search;
