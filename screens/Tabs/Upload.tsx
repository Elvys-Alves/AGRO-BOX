import React from 'react';
import * as ImagePicker from 'expo-image-picker'; // Biblioteca para selecionar imagens e vídeos do dispositivo
import Ionicons from 'react-native-vector-icons/Ionicons'; // Biblioteca de ícones
import { 
  Image, Text, View, TouchableOpacity, KeyboardAvoidingView, 
  Platform, TouchableWithoutFeedback, TextInput, Modal, Keyboard 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Garante a segurança em dispositivos com notch
import { Video } from 'expo-av'; // Componente para exibir vídeos

// Componente principal de Upload
const Upload = () => {
  const [media, setMedia] = React.useState<string | null>(null); // Armazena o URI da mídia selecionada
  const [mediaType, setMediaType] = React.useState<"image" | "video" | null>(null); // Tipo da mídia selecionada
  const [title, setTitle] = React.useState(''); // Título do post
  const [description, setDescription] = React.useState(''); // Descrição do post
  const [successfulUploadModalVisible, setSuccessfulUploadModalVisible] = React.useState(false); // Controle de visibilidade do modal de sucesso

  // Função para selecionar mídia da galeria
  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // Permite imagens e vídeos
      allowsEditing: true, // Permite edição básica
      quality: 1, // Qualidade máxima
    });

    if (!result.canceled) {
      const selectedAsset = result.assets[0]; // Seleciona o primeiro item
      setMedia(selectedAsset.uri); // Define o URI da mídia
      setMediaType(selectedAsset.type ?? null); // Define o tipo da mídia (imagem ou vídeo)
    }
  };

  // Função para limpar a mídia selecionada
  const clearMedia = () => {
    setMedia(null);
    setMediaType(null);
  };

  // Função chamada ao clicar no botão "Enviar"
  const handlePost = () => {
    setSuccessfulUploadModalVisible(true); // Exibe o modal de sucesso
  };

  // Verifica se o botão de envio deve ser desabilitado
  const isButtonDisabled = !media || title.trim() === '' || description.trim() === '';

  return (
    // Container que ajusta o layout ao aparecer o teclado (para iOS e Android)
    <KeyboardAvoidingView
      className="flex-1 bg-[#F9F9F9]" // Estilo flexível e cor de fundo
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Fecha o teclado ao tocar fora dos campos */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1 items-center justify-start bg-[#F9F9F9] px-4">
          <View className="w-full mt-6">
            
            {/* Seção de mídia */}
            <View className="bg-[#FFFFFF] w-full h-48 items-center justify-center rounded-lg shadow-md mb-6">
              {media ? (
                // Exibe a mídia selecionada (imagem ou vídeo)
                <View className="relative flex-1 w-full h-full">
                  {mediaType === 'video' ? (
                    <Video
                      source={{ uri: media }} // URI do vídeo
                      className="w-full h-full rounded-lg"
                      useNativeControls // Controles nativos de vídeo
                      isLooping // Reprodução em loop
                    />
                  ) : (
                    <Image
                      source={{ uri: media }} // URI da imagem
                      className="w-full h-full rounded-lg"
                    />
                  )}
                  {/* Botão para limpar a mídia */}
                  <TouchableOpacity
                    onPress={clearMedia}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                  >
                    <Ionicons name="trash" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              ) : (
                // Botão para anexar mídia
                <TouchableOpacity
                  className="items-center"
                  onPress={pickMedia}
                >
                  <Ionicons name="add-circle" size={60} color="#87CEEB" />
                  <Text className="text-base text-[#87CEEB]" style={{ fontFamily: 'poppins-medium' }}>
                    Anexar
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Campo de título */}
            <TextInput
              placeholder="Adicione um título..."
              value={title}
              onChangeText={setTitle}
              className="w-full bg-[#FFFFFF] text-lg px-4 py-4 mb-4 rounded-lg shadow-md text-[#767676]"
              style={{ fontFamily: 'poppins-medium' }}
              maxLength={20} // Limita o título a 20 caracteres
            />

            {/* Campo de descrição */}
            <TextInput
              placeholder="Adicione uma legenda..."
              value={description}
              onChangeText={setDescription}
              multiline // Permite várias linhas
              className="w-full bg-[#FFFFFF] text-sm px-4 py-4 rounded-lg shadow-md text-[#767676] h-32"
              style={{ fontFamily: 'poppins-regular' }}
            />

            {/* Botão de envio */}
            <TouchableOpacity
              className={`w-full h-14 items-center justify-center rounded-full mt-6 ${
                isButtonDisabled ? 'bg-[#B0E2FF]' : 'bg-[#87CEEB]' // Desabilitado (cinza claro) ou habilitado (azul)
              }`}
              onPress={handlePost}
              disabled={isButtonDisabled} // Desabilita o botão se necessário
              style={{ shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 3 }}
            >
              <Text className="text-lg text-white" style={{ fontFamily: 'poppins-medium' }}>
                Enviar
              </Text>
            </TouchableOpacity>
          </View>

          {/* Modal de sucesso */}
          <Modal
            transparent={true}
            visible={successfulUploadModalVisible} // Controla a visibilidade do modal
            animationType="fade"
            onRequestClose={() => setSuccessfulUploadModalVisible(false)} // Fecha o modal ao clicar fora
          >
            <View className="flex-1 justify-center items-center bg-[#00000066]">
              <View className="bg-white w-4/5 px-6 py-4 rounded-xl items-center shadow-md">
                <Ionicons name="checkmark-circle" size={60} color="#87CEEB" className="mb-4" />
                <Text
                  className="text-lg text-[#767676] text-center mb-2"
                  style={{ fontFamily: 'poppins-medium' }}
                >
                  Post enviado para validação!
                </Text>
                <Text
                  className="text-base text-[#767676] text-center mb-4"
                  style={{ fontFamily: 'poppins-regular' }}
                >
                  Você será informado assim que a validação for concluída.
                </Text>
                {/* Botão para fechar o modal */}
                <TouchableOpacity
                  onPress={() => setSuccessfulUploadModalVisible(false)}
                  className="bg-[#87CEEB] w-full py-3 items-center justify-center rounded-full shadow-md"
                >
                  <Text className="text-white text-base" style={{ fontFamily: 'poppins-medium' }}>
                    Voltar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Upload;
