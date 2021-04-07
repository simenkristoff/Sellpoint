import React from 'react';
import { AdvertEntity } from '@/state/ducks/advert/types';

const AdsContext = React.createContext<AdvertEntity[]>([]);

export const AdsProvider = AdsContext.Provider;

export default AdsContext;
