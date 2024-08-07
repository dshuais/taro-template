import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekday from 'dayjs/plugin/weekday';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isoWeek);
dayjs.extend(weekday);
dayjs.extend(duration);
dayjs.extend(isBetween);

export default dayjs;
