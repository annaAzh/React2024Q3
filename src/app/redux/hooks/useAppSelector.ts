import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from 'app/redux/config/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
