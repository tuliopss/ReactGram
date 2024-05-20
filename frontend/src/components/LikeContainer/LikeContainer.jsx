import styles from "./LikeContainer.module.css";
import { BsHeartFill, BsHeart } from "react-icons/bs";
const LikeContainer = ({ photo, user, handleLike }) => {
  return (
    <div className={styles.like}>
      {photo.likes && user && (
        <>
          {photo.likes.includes(user._id) ? (
            <BsHeartFill />
          ) : (
            <BsHeart onClick={() => handleLike(photo)} />
          )}
          <p>{photo.likes.length} like(s)</p>
        </>
      )}
    </div>
  );
};

export default LikeContainer;
