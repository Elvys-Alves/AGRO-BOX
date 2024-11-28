import { Dimensions, TouchableOpacity, Image, FlatList } from 'react-native'; // Importa componentes do React Native
import React from 'react'; // Importa o React
import { useNavigation } from '@react-navigation/native'; // Importa o hook useNavigation do React Navigation
import { StackNavigationProp } from '@react-navigation/stack'; // Importa o tipo StackNavigationProp
import { RootStackParamList } from '../../utils/types/navigation'; // Importa a lista de rotas da navegação
import { Post } from '../../utils/types/post'; // Importa o tipo Post que descreve a estrutura de um post

// Define o tipo de navegação para o componente, baseado nas rotas da pilha de navegação
type NavigationProp = StackNavigationProp<RootStackParamList>;

// Define as propriedades que o componente espera
interface PostListProps {
	posts: Post[]; // A lista de posts que será exibida
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
	// Obtém a navegação para permitir a navegação entre telas
	const navigation = useNavigation<NavigationProp>();
	// Obtém a largura da tela para ajustar os itens da lista
	const { width } = Dimensions.get('window');

	// Função que renderiza cada item na lista de posts
	const renderPostItem = ({ item }: { item: Post }) => (
		<TouchableOpacity
			className="border-r border-b border-[#B8B8B8]" // Adiciona bordas laterais e inferior ao item
			style={{ width: width / 3 - 1 }} // Ajusta a largura de cada item para 1/3 da tela
			onPress={() =>
				// Quando o item for pressionado, navega para a tela de detalhes do post
				navigation.navigate('PostDetails', {
					imageUrl: item.fotos[0]?.url || '', // Passa a primeira foto do post (se disponível)
					title: item.titulo, // Passa o título do post
					description: item.conteudo, // Passa o conteúdo do post
				})
			}
		>
			{/* Exibe a imagem do post */}
			<Image
				source={{ uri: item.fotos[0]?.url || 'https://via.placeholder.com/140' }} // A primeira foto do post ou uma imagem placeholder
				className="w-[140.33px] h-[140.33px]" // Define a largura e altura da imagem
			/>
		</TouchableOpacity>
	);

	return (
		// FlatList exibe uma lista de posts com suporte para rolagem
		<FlatList
			data={posts} // A lista de posts a ser exibida
			keyExtractor={(item) => item.id.toString()} // Define a chave única para cada item (baseado no ID do post)
			renderItem={renderPostItem} // Função que renderiza cada item
			numColumns={3} // Define que a lista será exibida em 3 colunas
			scrollEnabled={false} // Desativa a rolagem na lista (a rolagem é controlada externamente)
		/>
	);
};

export default PostList;
