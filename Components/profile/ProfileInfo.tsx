import { useFocusEffect } from '@react-navigation/native'; // Hook que permite rodar código toda vez que a tela estiver em foco
import React, { useState } from 'react'; // Importa o React e o hook useState
import { Image, Text, View } from 'react-native'; // Componentes básicos do React Native
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importa ícones do Ionicons
import { userStore } from '../../utils/stores/user'; // Importa o estado do usuário da store
import { User } from '../../utils/types/user'; // Tipo 'User' que descreve a estrutura do usuário

// Componente ProfileInfo que exibe as informações do perfil do usuário
const ProfileInfo = () => {
	// Hook de estado para armazenar as informações do perfil do usuário
	const [userProfile, setUserProfile] = useState<User>();

	// useFocusEffect é um hook que é chamado toda vez que a tela ganha ou perde o foco
	useFocusEffect(
		React.useCallback(() => {
			// Função chamada quando a tela recebe o foco
			const user = userStore.getState().user; // Obtém o usuário da store global
			if (user) {
				setUserProfile(user); // Atualiza o estado com os dados do usuário
			}

			// Função retornada é chamada quando a tela perde o foco (pode ser usada para limpeza)
			return () => {
				// Código de limpeza, se necessário
			};
		}, []), // O hook será executado uma vez por renderização do componente
	);

	return (
		<View className="ml-4 mt-4 self-start ">
			{/* Primeira seção: exibe o nome do usuário */}
			<View className="flex-row items-center">
				<Ionicons name="person-sharp" size={25} color="#303030" /> {/* Ícone de pessoa */}
				<Text
					className="text-base text-[#4A4A4A] ml-2"
					style={{ fontFamily: 'poppins-medium' }} // Define a fonte personalizada
				>
					{userProfile?.nome} | @{userProfile?.nome} {/* Exibe o nome e o username */}
				</Text>
			</View>

			{/* Segunda seção: exibe o nível do usuário */}
			<View className="flex-row items-center mt-2">
				<Image
					source={require('../../assets/icons/user-pages-icons/user-info/level-icon.png')} // Imagem do ícone de nível
					className="w-6 h-6 mr-2" // Define o tamanho da imagem
				/>
				<Text
					className="text-base text-[#50B454]" // Cor verde para o texto
					style={{ fontFamily: 'poppins-medium' }} // Define a fonte personalizada
				>
					Consumidor Verde {/* Nível do usuário */}
				</Text>
			</View>
		</View>
	);
};

export default ProfileInfo;
