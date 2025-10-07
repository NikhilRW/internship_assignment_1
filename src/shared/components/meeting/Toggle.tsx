import { styles } from "@/shared/styles/Meeting.styles";
import { MeetingType } from "@/shared/types/Meeting";
import { Text, TouchableOpacity, View } from "react-native";
import { ToggleProps } from "@/shared/types/Props";

const Toggle = ({
    value,
    onChange,
}: ToggleProps) => {
    const isOnline = value === 'online';
    return (
        <View style={[styles.row, styles.gap12]}>
            {(['offline', 'online'] as MeetingType[]).map(option => (
                <TouchableOpacity
                    key={option}
                    onPress={() => onChange(option)}
                    activeOpacity={0.8}
                    style={[
                        styles.toggleButton,
                        isOnline === (option === 'online') ? styles.toggleButtonActive : styles.toggleButtonInactive
                    ]}
                >
                    <Text style={option === value ? styles.toggleTextActive : styles.toggleTextInactive}>
                        {option === 'online' ? 'Online' : 'Offline'}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default Toggle;