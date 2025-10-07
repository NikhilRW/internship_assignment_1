import { styles } from '@/shared/styles/Meeting.styles';
import { Text, View } from "react-native";


const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.inputLabelContainer}>
    <Text style={styles.label}>{children?.toString().replace('*', '')}</Text>
    {children?.toString().includes('*') && (
      <Text style={styles.required}>*</Text>
    )}
  </View>
);

export default SectionLabel;
