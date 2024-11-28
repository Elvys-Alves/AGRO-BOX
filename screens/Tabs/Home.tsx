import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { getApiAxios } from '../../services/axios';
import { getToken } from '../../utils/session/manager';
import { NavigationProp } from '../../utils/types/navigation';
import { Post } from '../../utils/types/post';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileInfo from '../../Components/profile/ProfileInfo';

// Componente principal da tela Home
const Home = () => {
	// Estados para armazenar os posts e controlar o estado de carregamento
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);

	// Hook para obter a navegação
	const navigation = useNavigation<NavigationProp>();

	// Função assíncrona para buscar os posts da API
	const fetchPosts = async () => {
		try {
			// Obtém a instância do Axios configurada
			const api = await getApiAxios();
			
			// Faz uma chamada GET para a API
			const response = await api.get('/api/Veteri/receitas');

			// Armazena os dados recebidos no estado de posts
			setPosts(response.data);
		} catch (error) {
			// Loga o erro no console e exibe um alerta para o usuário
			console.error('Erro ao buscar posts:', error);
			Alert.alert('Erro', 'Não foi possível carregar as Postagens');
		} finally {
			// Finaliza o estado de carregamento
			setLoading(false);
		}
	};

	// Hook para executar código quando a tela ganha foco
	useFocusEffect(
		React.useCallback(() => {
			(async () => {
				// Obtém o token de sessão do usuário
				const token = await getToken();

				// Se o token não existir, redireciona para a tela de login
				if (!token) {
					alert('Você precisa realizar o login para acessar!');
					navigation.navigate('LogIn');
					return;
				}

				// Busca os posts da API
				fetchPosts();
			})();
		}, []),
	);

	// Renderiza uma tela de carregamento enquanto os dados são obtidos
	if (loading) {
		return (
			<View className="flex-1 justify-center items-center bg-white"></View>
		);
	}

	// Renderiza o componente principal da tela com a lista de posts
	return (
		<View className="flex-1 bg-white">
			{/* FlatList para renderizar os posts, mas atualmente está incompleta */}
			<FlatList
				ListHeaderComponent={<HomeHeader />} // Cabeçalho da lista
				contentContainerStyle={{ paddingBottom: 45 }} // Espaçamento inferior
			/>
		</View>
	);
};

// Componente que renderiza o cabeçalho da tela Home
const HomeHeader = () => {
	return (
		<SafeAreaView>
			<View className="px-8 flex flex-row my-6 items-center gap-x-6">
				{/* Componente que exibe informações do perfil do usuário */}
				<ProfileInfo />
			</View>
		</SafeAreaView>
	);
};

export default Home; // Exporta o componente para uso em outras partes da aplicação
