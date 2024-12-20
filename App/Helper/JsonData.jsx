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

export const NotificationData = [
  {
    id: 1,
    label: 'New delivery task has been assigned to you.',
    duration: '24 minutes ago',
  },
  {
    id: 2,
    label: 'New delivery task has been assigned to you.',
    duration: '1 hour ago',
  },
  {
    id: 3,
    label: 'New delivery task has been assigned to you.',
    duration: '6 hour ago',
  },
  {
    id: 4,
    label: 'New delivery task has been assigned to you.',
    duration: '1 day ago',
  },
  {
    id: 5,
    label: 'New delivery task has been assigned to you.',
    duration: '1 day ago',
  },
  {
    id: 6,
    label: 'New delivery task has been assigned to you.',
    duration: '2 day ago',
  },
];

export const DeliveryOrder = [
  {
    id: 1,
    type: Labels.Regular,
    pickUpDate: '24/07/2024',
    pickUpTime: '05:10pm',
    id: '#258413914346',
    charge: '499',
    pickUpLocation: '705,Elite Business House,Sola,Ahmedabad',
    dropLocation: 'B-606,Satyamev Eminence,Science City Road,Sola,Ahmedabad',
  },
  {
    id: 2,
    type: Labels.Urgent,
    pickUpDate: '24/07/2024',
    pickUpTime: '07:15pm',
    id: '#654713911257',
    charge: '799',
    pickUpLocation: 'B-606,Silver Radiance,Science City Road,Sola,Ahmedabad',
    dropLocation: 'B-606,Empire Business Hub,Science City Road,Sola,Ahmedabad',
  },
  {
    id: 3,
    type: Labels.Regular,
    pickUpDate: '25/07/2024',
    pickUpTime: '11:15am',
    id: '#982113914346',
    charge: '150',
    pickUpLocation: '705,Elite Business House,Sola,Ahmedabad',
    dropLocation: 'B-606,Satyamev Eminence,Science City Road,Sola,Ahmedabad',
  },
  {
    id: 4,
    type: Labels.Regular,
    pickUpDate: '25/07/2024',
    pickUpTime: '01:10pm',
    id: '#108313914346',
    charge: '499',
    pickUpLocation:
      '1596 Cheriton Dr, Port Shepstone, KwaZulu-Natal, South Africa',
    dropLocation: '1857 St. John Street, Kleinmond, Western Cape, South Africa',
  },
  {
    id: 5,
    type: Labels.Urgent,
    pickUpDate: '26/07/2024',
    pickUpTime: '07:10am',
    id: '#510813914346',
    charge: '999',
    pickUpLocation: '705,Elite Business House,Sola,Ahmedabad',
    dropLocation: 'B-606,Satyamev Eminence,Science City Road,Sola,Ahmedabad',
  },
  {
    id: 6,
    type: Labels.Regular,
    pickUpDate: '26/07/2024',
    pickUpTime: '03:10pm',
    id: '#713913914346',
    charge: '499',
    pickUpLocation:
      '1596 Cheriton Dr, Port Shepstone, KwaZulu-Natal, South Africa',
    dropLocation: '1857 St. John Street, Kleinmond, Western Cape, South Africa',
  },
];

export const DeliveryStatus = [
  {
    id: 1,
    status: 'Picked Up',
  },
  {
    id: 2,
    status: 'In-Transit',
  },
  {
    id: 3,
    status: 'Delivered',
  },
];
