import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Importação de componentes personalizados
import HeaderMenu from '../../Components/buttons/HeaderMenu';
import PostList from '../../Components/profile/PostList';
import ProfileImagesSection from '../../Components/profile/ProfileImagesSection';
import ProfileInfo from '../../Components/profile/ProfileInfo';

// Importação de funções utilitárias e tipos
import { getToken } from '../../utils/session/manager';
import { getUserDetails } from '../../utils/session/user-data';
import { NavigationProp } from '../../utils/types/navigation';
import { UserResponse } from '../../utils/types/user-response';
import { getApiAxios } from '../../services/axios';
import { Post } from '../../utils/types/post';

// Componente principal da tela de Perfil
const Profile = () => {
	const navigation = useNavigation<NavigationProp>();

	// Estado para armazenar as informações do usuário logado
	const [userProfile, setUserProfile] = useState<UserResponse | null>(null);

	// Estado para armazenar as postagens do usuário
	const [userPostagens, setUserPostagens] = useState<Post[]>([]);

	// Estado para controlar se os dados ainda estão sendo carregados
	const [loading, setLoading] = useState(true);

	// Função assíncrona para buscar as postagens do usuário
	const fetchUserPosts = async () => {
		try {
			// Obtém a instância do Axios configurada
			const api = await getApiAxios();

			// Faz uma requisição GET para buscar as postagens
			const response = await api.get('/api/Veteri/receitas');

			// Filtra as postagens para exibir apenas as que pertencem ao usuário atual
			const userPosts = response.data.filter(
				(post: Post) => post.idUsuario === userProfile?.email
			);

			// Atualiza o estado com as postagens do usuário
			setUserPostagens(userPosts);
		} catch (error) {
			// Loga o erro no console e exibe um alerta para o usuário
			console.error('Erro ao carregar os dados do Usuario:', error);
			Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
		} finally {
			// Finaliza o estado de carregamento
			setLoading(false);
		}
	};

	// Hook para executar código sempre que a tela ganha foco
	useFocusEffect(
		React.useCallback(() => {
			(async () => {
				// Obtém o token de sessão do usuário
				const token = await getToken();

				// Se o token não existir, redireciona o usuário para a tela de login
				if (!token) {
					alert('Você precisa realizar o login para acessar!');
					navigation.navigate('LogIn');
					return;
				} else {
					// Caso o token exista, carrega os detalhes do usuário
					const user = await getUserDetails();
					setUserProfile(user);

					// Busca as postagens do usuário
					await fetchUserPosts();
				}
			})();
			
			// Retorno vazio no cleanup (pode ser removido se não for usado)
			return () => {};
		}, []),
	);

	// Renderização do componente principal
	return (
		<SafeAreaView className="flex-1">
			{/* ScrollView para possibilitar rolagem do conteúdo */}
			<ScrollView
				showsVerticalScrollIndicator={false} // Oculta o indicador de rolagem vertical
				contentContainerStyle={{ paddingBottom: 45 }} // Adiciona margem inferior
			>
				{/* Botão do menu no canto superior direito */}
				<View className="flex-row justify-end m-2">
					<HeaderMenu />
				</View>

				{/* Seção com imagens e informações do perfil do usuário */}
				<ProfileImagesSection user={userProfile} />

				{/* Informações adicionais do perfil */}
				<ProfileInfo />

				{/* Seção de título "Postagens" com linha de separação */}
				<View className="flex items-center justify-center w-full h-[40px] border-b-2 border-[#B8B8B8] mt-[32px]">
					<Text
						className="text-base text-[#4A4A4A]"
						style={{ fontFamily: 'poppins-medium' }}
					>
						Postagens
					</Text>
				</View>

				{/* Lista de postagens do usuário */}
				<PostList posts={userPostagens} />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Profile; // Exporta o componente para uso em outras partes da aplicação
