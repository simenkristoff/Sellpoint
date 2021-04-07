const cities = [
  'Oslo',
  'Bergen',
  'Stavanger',
  'Tromsø',
  'Trondheim',
  'Ålesund',
  'Kristiansand',
  'Lillehammer',
  'Haugesund',
  'Molde',
  'Fredrikstad',
  'Narvik',
  'Kristiansund',
  'Honningsvåg',
  'Sandefjord',
  'Skien',
  'Drammen',
  'Porsgrunn',
  'Mo i Rana',
  'Larvik',
  'Arendal',
  'Kongsberg',
  'Halden',
  'Gjøvik',
  'Harstad',
  'Drøbak',
  'Hamar',
  'Tønsberg',
  'Lillestrøm',
  'Sarpsbord',
  'Kirkenes',
  'Karmøy',
  'Bodø',
  'Jessheim',
];

const locations = cities.sort(function (a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }

  return 0;
});

export default locations;
