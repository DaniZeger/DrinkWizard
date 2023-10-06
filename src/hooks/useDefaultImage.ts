import { useState } from 'react';

export function useDefaultImageUrl() {
    const imageUrl =
        'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=996';

    const [url, setUrl] = useState('');

    const getDefaultImageUrl = () => {
        if (url !== '') {
            return url;
        }
        return imageUrl;
    };

    const setCustomImageUrl = (customUrl: string) => {
        setUrl(customUrl);
    };

    return { getDefaultImageUrl, setCustomImageUrl };
}
