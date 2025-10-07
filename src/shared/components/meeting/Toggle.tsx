import { styles } from "@/shared/styles/Meeting.styles";
import { MeetingType } from "@/shared/types/Meeting";
import { Text, TouchableOpacity, View } from "react-native";


const Toggle = ({
    value,
    onChange,
}: {
    value: MeetingType;
    onChange: (value: MeetingType) => void;
}) => {
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
                        {
                            borderColor:
                                isOnline === (option === 'online') ? '#7c3aed' : '#e5e5ea',
                        },
                        {
                            backgroundColor:
                                isOnline === (option === 'online')
                                    ? 'rgba(124,58,237,0.08)'
                                    : '#fff',
                        },
                    ]}
                >
                    <Text style={{ color: option === value ? '#7c3aed' : '#111' }}>
                        {option === 'online' ? 'Online' : 'Offline'}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default Toggle;