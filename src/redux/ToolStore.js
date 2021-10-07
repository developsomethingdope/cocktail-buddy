import { configureStore } from '@reduxjs/toolkit';
import sliceGeneralReducer from './SliceGeneral';
import slicePageReducer from './SlicePage';

export default configureStore({
  reducer: {
    general: sliceGeneralReducer,
    page: slicePageReducer
  }
});
