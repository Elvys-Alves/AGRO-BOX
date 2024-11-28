import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../utils/types/navigation';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

interface GoBackButtonProps {
    title?: string;
}

type NavigationProp = StackNavigationProp<RootStackParamList>;

const GoBackButton = ({ title }: GoBackButtonProps) => {

    const navigation = useNavigation<NavigationProp>();

    return (
        <View className='flex-row items-center justify-center mt-8' >
            <TouchableOpacity
				onPress={() => navigation.goBack()}
				className="absolute top-15 left-5 bg-white p-2 rounded-full"
			>
				<Ionicons name="chevron-back" size={18} color="#767676" />
				</TouchableOpacity>

            {title && (
                <Text className='text-2xl text-[#767676]' style={{ fontFamily: 'poppins-semi-bold' }} >{title}</Text>
            )}
        </View>
    );
}

export default GoBackButton;