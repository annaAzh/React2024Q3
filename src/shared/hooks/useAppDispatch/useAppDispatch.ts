import { AppDispatch } from 'app/providers/routerProvider/storeProvider';
import { useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
