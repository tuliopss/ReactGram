import React, { useEffect, useState } from "react";
import styles from "./EditProfile.module.css";
import { uploads } from "../../utils/api";
import {
  resetMessage,
  updateProfile,
  userProfile,
} from "../../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import Message from "../../components/Message/Message";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user, error, loading, message } = useSelector((state) => state.user);
  const [userState, setUserState] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  const handleFile = (e) => {
    const image = e.target.files[0];
    setPreviewImage(image);
    setProfileImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name,
    };

    if (profileImage) {
      userData.profileImage = profileImage;
    }

    if (bio) {
      userData.bio = bio;
    }

    if (password) {
      userData.password = password;
    }

    const formData = new FormData();
    Object.keys(userData).forEach((key) => formData.append(key, userData[key]));
    dispatch(updateProfile(formData));
    // const userFormData = Object.keys(userData).forEach((key) => {
    //   formData.append(key, userData[key]);
    // });

    // formData.append("user", userFormData);

    // await dispatch(updateProfile(userFormData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  return (
    <div id={styles.edit_profile}>
      <h2>Edite seus dados</h2>
      <p className={styles.subtitle}>
        Adicione uma imagem de perfil e conte mais sobre você!
      </p>

      {(user.profileImage || previewImage) && (
        <img
          className={styles.profile_image}
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : `${uploads}/users/${user.profileImage}`
          }
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Nome'
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
        <input type='email' placeholder='Email' disabled value={email || ""} />
        <label>
          <span>Imagem do perfil:</span>
          <input type='file' onChange={handleFile} />
        </label>

        <label>
          <span>Bio: </span>
          <input
            type='text'
            placeholder='Descrição do perfil'
            onChange={(e) => setBio(e.target.value)}
            value={bio || ""}
          />
        </label>

        <label>
          <span>Deseja alterar sua senha?</span>
          <input
            type='password'
            placeholder='Digite sua nova senha'
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <input type='password' name='' id='' /> */}
        </label>
        {!loading && <input type='submit' value='Atualizar' />}
        {loading && <input type='submit' value='Aguarde...' disabled />}
        {error && <Message msg={error} type='error' />}
        {message && <Message msg={message} type='success' />}
      </form>
    </div>
  );
};

export default EditProfile;
