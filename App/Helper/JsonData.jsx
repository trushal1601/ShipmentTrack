import {Images} from '../Assets/Assets';
import {Labels} from '../Assets/Labels';

export const CountryData = [
  {id: 1, name: Labels.english, icon: Images.uk_icon},
  {id: 2, name: Labels.french, icon: Images.france_icon},
];

export const ShipmentData = [
  {
    id: 1,
    label: Labels.DeliveriesAssigned,
    count: 10,
    status: Images.icon1,
    bgColor: '#DBF2FF',
  },
  {
    id: 2,
    label: Labels.CompletedDeliveries,
    count: '06',
    status: Images.icon2,
    bgColor: '#DDF3E6',
  },
  {
    id: 3,
    label: Labels.PendingDeliveries,
    count: '01',
    status: Images.icon3,
    bgColor: '#FFF6D8',
  },
  {
    id: 4,
    label: Labels.DelayedDeliveries,
    count: '03',
    status: Images.icon4,
    bgColor: '#FFEDED',
  },
];
