import { Ionicons } from '@expo/vector-icons'; // Ícones da biblioteca Expo Vector Icons.
import { useNavigation, useRoute } from '@react-navigation/native'; // Hooks para navegação e acesso aos parâmetros.
import * as React from 'react'; // Biblioteca React.
import { Image, Modal, SafeAreaView, ScrollView, Text, View } from 'react-native'; // Componentes nativos do React Native.
import { TouchableOpacity } from 'react-native-gesture-handler'; // Componente para interação com toques.

const PostDetails = () => {
    const navigation = useNavigation(); // Hook para manipular navegação.
    const route = useRoute(); // Hook para acessar os parâmetros passados pela navegação.

    const { imageUrl, title, description } = route.params; // Obtém os parâmetros da navegação: `imageUrl`, `title` e `description`.

    const [modalVisible, setModalVisible] = React.useState<boolean>(false); // Estado para controlar a visibilidade do modal.

    return (
        <SafeAreaView className="flex-1">
            {/* Conteúdo principal em um ScrollView */}
            <ScrollView
                contentContainerStyle={{ paddingBottom: 45 }} // Espaço inferior extra.
                showsVerticalScrollIndicator={false} // Remove a barra de rolagem vertical.
            >
                {/* Botão para voltar à tela anterior */}
                <View className="absolute top-10 left-5 z-10">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()} // Função para voltar à tela anterior.
                        className="bg-white p-2 rounded-full shadow-lg"
                    >
                        <Ionicons name="chevron-back" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                {/* Conteúdo principal da tela */}
                <View className="flex-1 items-center justify-center mt-10">

                    {/* Botão de opções (abre o modal) */}
                    <View className="flex self-end mr-2 mt-16">
                        <TouchableOpacity onPress={() => setModalVisible(true)}> 
                            <Ionicons name="ellipsis-vertical" size={24} /> {/* Ícone de "três pontos verticais". */}
                        </TouchableOpacity>
                    </View>

                    {/* Imagem do Post */}
                    <Image
                        source={imageUrl} // Fonte da imagem passada via navegação.
                        className="w-full h-[45vh] mt-4"
                        resizeMode="cover" // Ajusta a imagem para cobrir a área sem distorção.
                    />

                    {/* Informações do Post */}
                    <View className="w-11/12 mt-5">
                        {/* Título do Post */}
                        <Text
                            className="text-2xl mb-2"
                            style={{ fontFamily: 'poppins-medium' }} // Fonte personalizada.
                        >
                            {title}
                        </Text>

                        {/* Descrição do Post */}
                        <Text
                            className="text-justify mt-2.5 leading-6"
                            style={{ fontFamily: 'poppins-regular' }} // Fonte personalizada.
                        >
                            {description}
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Modal para opções do post */}
            <Modal
                visible={modalVisible} // Controla a visibilidade do modal.
                transparent={true} // O modal é transparente para destacar apenas o conteúdo interno.
                animationType="fade" // Animação de abertura.
                onRequestClose={() => setModalVisible(false)} // Função executada ao fechar o modal.
            >
                <View className="w-full h-full flex-1 items-center justify-center">
                    {/* Conteúdo interno do modal */}
                    <View className="bg-white w-3/4 p-6 rounded-xl shadow-md">
                        {/* Botão para fechar o modal */}
                        <TouchableOpacity
                            className="flex self-end m-1"
                            onPress={() => {
                                console.log("Modal Fechado"); // Log para depuração.
                                setModalVisible(false); // Fecha o modal.
                            }}
                        >
                            <Ionicons name="close-circle-outline" size={28} color="#455A64" />
                        </TouchableOpacity>

                        {/* Título e opções do modal */}
                        <View className="flex items-center gap-5">
                            {/* Título do modal */}
                            <Text
                                className="text-lg text-[#1F2B4D]"
                                style={{ fontFamily: 'poppins-medium' }}
                            >
                                Opções do post
                            </Text>

                            {/* Botão para remover o post */}
                            <TouchableOpacity
                                onPress={() => {
                                    console.log("Post removido"); // Log para depuração.
                                }}
                                className="bg-[#455A64] items-center justify-center px-14 py-2 rounded-lg"
                            >
                                <Text
                                    className="text-base text-white"
                                    style={{ fontFamily: 'poppins-medium' }}
                                >
                                    Remover Post
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default PostDetails;
