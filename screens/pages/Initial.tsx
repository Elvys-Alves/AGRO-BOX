import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import 'tailwindcss/tailwind.css';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { checkIsRemember } from '../../utils/async-storage/user-data';
import { getToken } from '../../utils/session/manager';
import { NavigationProp } from '../../utils/types/navigation';

export default function Initial() {
	const navigation = useNavigation<NavigationProp>();

	useFocusEffect(
		React.useCallback(() => {
			(async () => {
				const isRemember = await checkIsRemember();
				const token = await getToken();
				if (isRemember && token) navigation.navigate('Main');
			})();
			return () => {
				// Cleanup function
			};
		}, []),
	);

	return (
		<View className="flex-1 bg-[#F9F9F9] items-center justify-between">
			{/* Contêiner superior */}
			<View className="bg-[#87CEEB] w-full h-[65%] rounded-b-[180px] items-center justify-center mb-10">
				{/* Logo e slogan */}
				<View className="mt-[250] items-center justify-center">
					<Text className="text-4xl font-bold text-white mb-1 mt-10">AGRO BOX</Text>
					<Text className="text-white text-sm">PENSE FORA DA CAIXA</Text>
				</View>
			</View>

			{/* Contêiner inferior */}
			<View className="items-center mb-20">
				{/* Botão "Crie seu perfil" */}
				<TouchableOpacity
					onPress={() => navigation.navigate('Register')}
					className="bg-[#87CEEB] py-3 w-64 rounded-3xl mb-3"
				>
					<Text className="text-white text-lg font-bold text-center">Crie seu perfil</Text>
				</TouchableOpacity>

				{/* Botão "Entrar" */}
				<TouchableOpacity
					onPress={() => navigation.navigate('LogIn')}
					className="border-2 border-[#87CEEB] py-3 w-64 rounded-3xl mb-3"
				>
					<Text className="text-[#87CEEB] text-lg font-bold text-center">Entrar</Text>
				</TouchableOpacity>

				{/* Links de Política e Termos */}
				<View className="flex-row justify-center mb-1 mt-8">
					<TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
						<Text className="text-[#87CEEB] text-xs mx-1">Política de privacidade | Termos & Condições</Text>
					</TouchableOpacity>
				</View>

				{/* Rodapé */}
				<Text className="text-[#87CEEB] text-xs">© 2024 Consumo Inteligente</Text>
			</View>
		</View>
	);
}
