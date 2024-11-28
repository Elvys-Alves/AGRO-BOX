import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, View } from 'react-native';
import { UserResponse } from '../../utils/types/user-response';

type ProfileImagesSectionProps = {
	user: UserResponse | null;
};

const ProfileImagesSection = ({ user }: ProfileImagesSectionProps) => {
	return (
		<View className="items-center justify-center">
			<View className="relative w-40 h-40 rounded-full items-center justify-center shadow-sm">
				{user?.fotoUsu ? (
					<Image
						source={{ uri: user?.fotoUsu }}
						className="w-full h-full rounded-full"
					/>
				) : (
					<Ionicons name="person" size={100} color="#ccc" />
				)}
				<Image
					source={require('../../assets/icons/IconsLevel/arvore1.png')}
					className="absolute bottom-0 right-[-2px] w-12 h-12"
				/>
			</View>
		</View>
	);
};

export default ProfileImagesSection;

