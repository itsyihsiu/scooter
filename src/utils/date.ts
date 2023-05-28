import * as moment from 'moment';

export function isValidDate(dateString: string, format: string) {
  return moment(dateString, format, true).isValid();
}

export function inYears(dateString: string, format: string, years: number) {
  let targetDate = moment(dateString, format);
  let now = moment();
  let difference = now.diff(targetDate, 'years');

  console.log('difference: ' + difference);

  return targetDate < now && difference < years;
}
