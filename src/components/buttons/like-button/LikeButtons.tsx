import './LikeButtons.scss'

interface LikeButtonsProps {
    handleLike: React.MouseEventHandler
    handleDislike: React.MouseEventHandler
    likesCount: number,
    dislikesCount: number
    isLike: boolean,
    isDislike: boolean,
}

function LikeButtons({
    handleLike,
    handleDislike,
    dislikesCount,
    likesCount,
    isLike,
    isDislike
}: LikeButtonsProps) {

    return (
        <div className="like-buttons">
            <div className="like-buttons__warper">
                <button
                    onClick={handleLike}
                    className="btn like-buttons__warper__button"
                >
                    <i className={`bi bi-hand-thumbs-up${isLike ? "-fill" : ''}`}></i>
                </button>
                <small>{likesCount} Likes</small>
            </div>
            <div className="like-buttons__warper">
                <button
                    onClick={handleDislike}
                    className="btn like-buttons__warper__button"
                >
                    <i className={`bi bi-hand-thumbs-down${isDislike ? "-fill" : ''}`}></i>
                </button>
                <small>{dislikesCount} Dislikes</small>
            </div>
        </div>
    );
}

export default LikeButtons;