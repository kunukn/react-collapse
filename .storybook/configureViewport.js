import { configureViewport, INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const newViewports = {
    kindleFire2: {
      name: 'Kindle Fire 2',
      styles: {
        width: '600px',
        height: '963px'
      }
    },
    kindleFireHD: {
      name: 'Kindle Fire HD',
      styles: {
        width: '533px',
        height: '801px'
      }
    }
  };

  // configureViewport({
  //   defaultViewport: 'iphone6',
  //   viewports: {
  //     ...INITIAL_VIEWPORTS,
  //     ...newViewports
  //   }
  // });