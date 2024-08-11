import { AppDispatch } from '@/app/src/_app/providers/storeProvider';
import { useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
