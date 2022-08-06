export const unlockScroll = (body) => {
    body.style.cssText = '';
    window.scroll(0, body.dataset.positionY);
    console.log('scroll unlock');
};