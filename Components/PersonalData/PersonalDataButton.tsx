import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

import { Ionicons } from '@expo/vector-icons';

interface PersonalDataButtonProps {
    text: string;
    onPress: () => void;
}

const PersonalDataButton = ({ text, onPress }: PersonalDataButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className='w-10/12 h-14 border-2 border-[#87CEEB] rounded-full pl-2 flex-row items-center justify-between mb-7'
        >
            <Text className='text-xl text-[#87CEEB]' style={{ fontFamily: 'poppins-medium' }} >{text}</Text>
            <Ionicons name='chevron-forward' size={30} color={'#87CEEB'} />
        </TouchableOpacity>
    );
}

export default PersonalDataButton;