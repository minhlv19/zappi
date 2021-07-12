import { IOrder } from 'App/Types/order';
import { padStart } from 'lodash';
import moment from 'moment';

export const getOrderLeftHeaderText = (order: IOrder) => {
  const orderNumberFormatted = padStart(order.orderNumber?.toString(), 3, '0');
  const orderTimeFormatted = moment(order?.createdAt).format('HH:mm');
  return `# ${orderNumberFormatted} • ${orderTimeFormatted}`;
};
