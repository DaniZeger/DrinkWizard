const useRatingIcon = (rate: number) => {
    const getIcon = () => {
        if (rate >= 4.5) {
            return "laughing"
        } else if (rate >= 3.5) {
            return "smile"
        } else if (rate >= 2.5) {
            return "neutral"
        } else if (rate >= 1.5) {
            return "frown"
        } else if (rate > 0) {
            return "angry"
        } else {
            return "dizzy"
        }
    };

    return getIcon();
};

export default useRatingIcon;