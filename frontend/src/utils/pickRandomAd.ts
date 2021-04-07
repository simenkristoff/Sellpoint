import { AdvertEntity } from '@/state/ducks/advert/types';

const pickRandomAd = (ads: AdvertEntity[]) => {
  const index = Math.floor(Math.random() * Math.floor(ads.length));

  return ads[index];
};

export default pickRandomAd;
