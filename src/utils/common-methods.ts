import ImageCropPicker from 'react-native-image-crop-picker';

export const PickImage = {
  getSinglePic: (type: boolean, callback: any) => {
    ImageCropPicker.openPicker({
      cropping: true,
      width: 300,
      height: type ? 300 : 200,
      cropperCircleOverlay: false,
      includeBase64: type,
    }).then((image: any) => {
      const arr = image.path.split('/');
      const filename = arr[arr.length - 1];
      const imgContent = type ? image.data : image.path;
      callback(imgContent, image.mime, filename);
    });
  },

  getMultiplePic: (type: any, callback: any) => {
    let temp = [];
    ImageCropPicker.openPicker({
      cropping: true,
      multiple: true,
      width: 300,
      height: 200,
    }).then(image => {
      temp = image.map(item => item.path);
      callback(temp);
    });
  },

  getCamera: (type: boolean, callback: any) => {
    ImageCropPicker.openCamera({
      cropping: true,
      width: 300,
      height: type ? 300 : 200,
      cropperCircleOverlay: false,
      useFrontCamera: true,
      includeBase64: type,
    }).then((image: any) => {
      const arr = image.path.split('/');
      const filename = arr[arr.length - 1];
      const imgContent = type ? image.data : image.path;
      callback(imgContent, image.mime, filename);
    });
  },
};
