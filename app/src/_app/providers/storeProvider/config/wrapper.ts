import { createWrapper } from 'next-redux-wrapper';
import { store } from './store';

const createStore = () => store;
export const wrapper = createWrapper(createStore);
