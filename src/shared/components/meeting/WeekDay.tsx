import { styles } from '@/shared/styles/Meeting.styles';
import { Text } from 'react-native';
import { CalendarWeek } from 'react-native-ui-datepicker';

export const WeekdayComponent = (weekday: CalendarWeek) => (
  <Text style={styles.datePickerWeekday}>{weekday.name.min.slice(0, 1)}</Text>
);