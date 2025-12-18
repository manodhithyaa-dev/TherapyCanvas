import { IndianRegion } from '@/types/therapy';

export interface RegionInfo {
  code: IndianRegion;
  name: string;
  states: string[];
}

export const indianRegions: RegionInfo[] = [
  {
    code: 'north',
    name: 'North India',
    states: ['Delhi', 'Punjab', 'Haryana', 'Himachal Pradesh', 'Uttarakhand', 'Uttar Pradesh', 'Jammu & Kashmir', 'Rajasthan'],
  },
  {
    code: 'south',
    name: 'South India',
    states: ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Puducherry'],
  },
  {
    code: 'east',
    name: 'East India',
    states: ['West Bengal', 'Odisha', 'Bihar', 'Jharkhand'],
  },
  {
    code: 'west',
    name: 'West India',
    states: ['Maharashtra', 'Gujarat', 'Goa'],
  },
  {
    code: 'central',
    name: 'Central India',
    states: ['Madhya Pradesh', 'Chhattisgarh'],
  },
  {
    code: 'northeast',
    name: 'Northeast India',
    states: ['Assam', 'Meghalaya', 'Manipur', 'Mizoram', 'Nagaland', 'Tripura', 'Arunachal Pradesh', 'Sikkim'],
  },
];

export const getRegionName = (code: IndianRegion): string => {
  const region = indianRegions.find(r => r.code === code);
  return region?.name || 'All India';
};

