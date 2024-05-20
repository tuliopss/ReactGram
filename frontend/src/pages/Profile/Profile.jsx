import React, { useEffect, useRef, useState } from "react";
import styles from "./Profile.module.css";
import { uploads } from "../../utils/api";
import { Link, useParams } from "react-router-dom";
import Message from "../../components/Message/Message";
import { useSelector, useDispatch } from "react-redux";
import { getUserById } from "../../slices/userSlice";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";
import {
  deletePhoto,
  getUserPhotos,
  publishPhoto,
  resetMessage,
  updatePhoto,
} from "../../slices/photoSlice";
const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);

  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const [editImage, setEditImage] = useState("");
  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");

  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const toggleForms = () => {
    newPhotoForm.current.classList.toggle(styles.hide);
    editPhotoForm.current.classList.toggle(styles.hide);
  };

  const handleFile = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    const formData = new FormData();

    Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );

    dispatch(publishPhoto(formData));

    setTitle("");
    resetComponentMessage();
  };

  const handleDelete = (id) => {
    dispatch(deletePhoto(id));
    resetComponentMessage();
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const photoData = {
      title: editTitle,
      id: editId,
    };

    dispatch(updatePhoto(photoData));
    resetComponentMessage();
  };

  const handleEdit = (photo) => {
    if (editPhotoForm.current.classList.contains(styles.hide)) {
      toggleForms();
    }
    setEditId(photo._id);

    setEditTitle(photo.title);
    setEditImage(photo.image);
  };

  const handleCancelEdit = () => {
    toggleForms();
  };

  useEffect(() => {
    dispatch(getUserById(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id={styles.profile}>
      <div className={styles.profile_header}>
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}

        <div className={styles.profile_description}>
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>

      {id === userAuth._id && (
        <>
          <div className={styles.new_photo} ref={newPhotoForm}>
            <h3>Compartilhe seus momentos:</h3>
            <form onSubmit={handleSubmit}>
              <label>
                <span>Título da sua foto</span>
                <input
                  type='text'
                  placeholder='Insira um título'
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || ""}
                />
              </label>

              <label>
                <span>Imagem:</span>
                <input type='file' onChange={handleFile} />
              </label>

              {!loadingPhoto && <input type='submit' value='Postar' />}
              {loadingPhoto && (
                <input type='submit' value='Aguarde...' disabled />
              )}
            </form>
          </div>

          <div
            className={`${styles.edit_photo} ${styles.hide}`}
            ref={editPhotoForm}>
            <p>Editando</p>
            {editImage && (
              <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
            )}

            <form onSubmit={handleUpdate}>
              <input
                type='text'
                onChange={(e) => setEditTitle(e.target.value)}
                value={editTitle || ""}
              />

              <input type='submit' value='Atualizar' />
              <button className={styles.cancel_btn} onClick={handleCancelEdit}>
                Cancelar edição
              </button>
            </form>
          </div>
          {errorPhoto && <Message msg={errorPhoto} type='error' />}
          {messagePhoto && <Message msg={messagePhoto} type='success' />}
        </>
      )}

      <div className={styles.user_photos}>
        <h2>Fotos publicadas</h2>
        <div className={styles.photos_container}>
          {photos &&
            photos.map((photo) => (
              <div className={styles.photo} key={photo._id}>
                {photo.image && (
                  <img
                    src={`${uploads}/photos/${photo.image}`}
                    alt={photo.title}
                  />
                )}

                {id === userAuth._id ? (
                  <div className={styles.actions}>
                    {" "}
                    <Link className={styles.btn} to={`photos/${photo._id}`}>
                      <BsFillEyeFill />
                    </Link>
                    <BsPencilFill onClick={() => handleEdit(photo)} />
                    <BsXLg onClick={() => handleDelete(photo._id)} />
                  </div>
                ) : (
                  <Link className={styles.btn} to={`photos/${photo._id}`}>
                    Ver
                  </Link>
                )}
              </div>
            ))}

          {photos.length === 0 && <p>Sem fotos cadastradas...</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
