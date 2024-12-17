export const getImageSource = img => {
    if (typeof img === 'string') {
      return {uri: img};
    }
    return img;
  };