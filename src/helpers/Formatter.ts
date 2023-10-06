export function formatDate(value: string | Date | undefined) {
    return new Date(value ? value : '').toLocaleDateString()
}

export function getDaysAgo(lastUpdateDate: Date | undefined) {
    if (lastUpdateDate) {
        const currentDate = new Date();
        const updateDate = new Date(lastUpdateDate);
        const timeDifference = currentDate.getTime() - updateDate.getTime();
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }
};

export function renderHTMLContent(htmlString: string) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = htmlString;
    const elements = wrapper.querySelectorAll('img, p');
    elements.forEach((element) => {
        if (element.tagName === 'IMG') {
            element.classList.add('post-page__post__image');
        }
        if (element.tagName === 'P') {
            element.classList.add('post-page__post__text');
        }
    });

    return wrapper.innerHTML;
};