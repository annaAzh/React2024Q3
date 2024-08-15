import { AppDispatch } from 'app/redux/config/store';
import { useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
