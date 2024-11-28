import React from 'react'; 
import { View, Text, TouchableOpacity, Image } from 'react-native'; 
import { useRoute, useNavigation } from '@react-navigation/native'; 
import { RootStackParamList } from '../../utils/types/navigation'; 
import { StackNavigationProp } from '@react-navigation/stack';

// Define o tipo de navegação usando o RootStackParamList, que contém todas as rotas do app.
type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function ResultadoConsumidor() {
  // Hook para acessar os parâmetros da rota atual (passados ao navegar para esta tela).
  const route = useRoute();
  
  // Hook para navegar para outras telas.
  const navigation = useNavigation<NavigationProp>();

  // Desestruturação dos parâmetros da rota, neste caso, a pontuação e o total de perguntas.
  const { score, total } = route.params as { score: number; total: number };

  // Função que lida com a navegação para a tela principal após o clique no botão "Continuar".
  const handleContinue = () => {
    navigation.navigate('Main'); // Navega para a tela "UserFeed"
  };

  // Função que retorna uma mensagem e uma imagem dependendo da pontuação do usuário.
  const getMessageAndImage = () => {
    if (score === total) {
      return {
        title: 'Parabéns!',
        message: 'Você é um consumidor verde experiente!',
        image: require('../../assets/icons/IconsLevel/arvore3.png'), // Imagem para o máximo de acertos
      };
    } else if (score >= total * 0.75) { // Mais de 75% de acertos
      return {
        title: 'Parabéns!',
        message: 'Você é um consumidor verde responsável!',
        image: require('../../assets/icons/IconsLevel/arvore2.png'), // Imagem intermediária
      };
    } else if (score >= total * 0.5) { // Mais de 50% de acertos
      return {
        title: 'Parabéns!',
        message: 'Você é um consumidor verde!',
        image: require('../../assets/icons/IconsLevel/arvore1.png'), // Imagem intermediária
      };
    } else if (score >= total * 0.25) { // Mais de 25% de acertos
      return {
        title: 'Parabéns!',
        message: 'Você é um consumidor verde iniciante!',
        image: require('../../assets/icons/IconsLevel/arvore0.png'), // Imagem intermediária
      };
    } else {
      return {
        title: 'Poxa... :(',
        message: 'Ainda há muito a melhorar. Continue usando nosso app para se tornar um consumidor verde',
        image: require('../../assets/icons/IconsLevel/arvore1.1.png'), // Imagem para poucos acertos
      };
    }
  };

  // Desestrutura os valores retornados da função getMessageAndImage.
  const { title, message, image } = getMessageAndImage();

  return (
    <View className='flex-1 justify-center items-center bg-[#F9F9F9] px-5'>
      {/* Exibe o título com base no nível de pontuação do usuário */}
      <Text className='text-xl font-bold text-[#A9DBF1] mb-10'>{title}</Text>

      {/* Exibe a mensagem dinâmica com base na pontuação */}
      <Text className='text-xl font-bold text-[#A9DBF1] text-center mb-20'>
        {message}
      </Text>

      {/* Exibe a imagem correspondente ao nível de pontuação */}
      <Image source={image} className='w-36 h-36 mb-20' />

      {/* Botão para continuar usando o app */}
      <TouchableOpacity onPress={handleContinue}>
        <Text className='text-x1 font-bold text-[#A9DBF1] underline'>
          Clique aqui para continuar usando nosso app!
        </Text>
      </TouchableOpacity>
    </View>
  );
}
