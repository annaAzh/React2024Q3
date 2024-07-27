import { AppDispatch } from 'app/providers/storeProvider';
import { useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
