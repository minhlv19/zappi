import { ChunkValue, formatChunkValue } from 'App/Containers/auth/SetBusinessHoursScreen';
import moment from 'moment';
import { DAYS_IN_WEEK } from './constants';
import i18n from 'i18next';
import { pick } from 'lodash';

export const formatMinutesToHoursInDay = (minutes: number) => {
  return moment().startOf('day').add(minutes, 'minutes').format('HH:mm');
};

export const getBusinessHoursText = (storeInfo: any) => {
  if (!storeInfo) return '';
  if (storeInfo.onHolidayEnabled) return i18n.t('On Holidays');
  if (storeInfo.anytimeOrderEnabled) return i18n.t('Always Open');
  if (!storeInfo?.businessHours) return i18n.t('Set business hours now');

  const todayWeekdayNumber = moment().isoWeekday();
  const businessHours = storeInfo?.businessHours;

  let flattenedBusinessHours: any = [];

  Object.keys(businessHours).forEach(key => {
    businessHours[key].forEach((hour: ChunkValue) => {
      flattenedBusinessHours.push({
        dayOfWeekKey: key,
        start: hour.start,
        end: hour.end,
        dayOfWeekNumber: DAYS_IN_WEEK.findIndex(i => i.key == key) + 1,
      });
    });
  });

  const minutesToday = moment.duration(moment().diff(moment().startOf('day'))).asMinutes();

  for (let flattenedHour of flattenedBusinessHours) {
    if (flattenedHour.dayOfWeekNumber >= todayWeekdayNumber) {
      if (flattenedHour.end >= minutesToday) {
        const message = `${i18n.t('Open')} ${formatChunkValue(flattenedHour).text}`;
        return message;
      }
    }
  }

  // if current is larger than all business hour chunks -> return first
  return `${i18n.t('Open')} ${formatChunkValue(flattenedBusinessHours[0]).text}`;
};

export enum GetUpdateDateTypeEnums {
  DATE = 'DATE',
  TIME = 'TIME',
}

export const getUpdatedDatetime = (
  currentDatetime: Date,
  updateDatetimeString: string,
  updateType: GetUpdateDateTypeEnums,
) => {
  let updateDatetimeStringFormat: string;
  let momentDatePickProperties: string[];
  if (updateType == GetUpdateDateTypeEnums.DATE) {
    updateDatetimeStringFormat = 'D/MM/YYYY';
    momentDatePickProperties = ['date', 'months', 'years'];
  } else {
    updateDatetimeStringFormat = 'hh:mm A';
    momentDatePickProperties = ['hours', 'minutes'];
  }
  const dateUpdate = pick(
    moment(updateDatetimeString, updateDatetimeStringFormat).toObject(),
    momentDatePickProperties,
  );
  const newDate = moment(currentDatetime).set(dateUpdate).toDate();
  return newDate;
};
