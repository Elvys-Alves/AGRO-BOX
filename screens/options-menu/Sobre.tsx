import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoBackButton from '../../Components/GoBackButton';

const Sobre = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* GoBackButton fora do ScrollView */}
      <GoBackButton title='Sobre' />

      <View className='px-4 mt-10 flex-1'>
        {/* ScrollView para o conteúdo */}
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <View className='flex items-start'>

            {/* Sobre o Aplicativo */}
            <View className='mb-6'>
              <Text className='text-xl font-bold mb-2 text-[#767676]'>Sobre o Aplicativo</Text>
              <Text className='text-base text-justify'>
                Nosso aplicativo foi desenvolvido para apoiar profissionais de agronomia e medicina veterinária na adoção de práticas de consumo inteligente e sustentável. Ele oferece uma interface simples e intuitiva para facilitar a conscientização e a implementação de hábitos mais responsáveis, tanto no ambiente clínico quanto no dia a dia.
              </Text>
            </View>

            {/* Objetivo */}
            <View className='mb-6'>
              <Text className='text-xl font-bold mb-2 text-[#767676]'>Objetivo</Text>
              <Text className='text-base text-justify'>
                O principal objetivo do aplicativo é promover a conscientização sobre o consumo inteligente e o descarte responsável de materiais, ajudando os profissionais a adotarem práticas mais sustentáveis. Além disso, o app visa criar uma comunidade de profissionais que compartilham ideias e experiências para fortalecer o compromisso com a sustentabilidade.
              </Text>
            </View>

            {/* Benefícios */}
            <View className='mb-6'>
              <Text className='text-xl font-bold mb-2 text-[#767676]'>Benefícios</Text>
              <Text className='text-base text-justify'>
                Com o uso do nosso aplicativo, os profissionais podem melhorar suas práticas diárias, reduzindo o impacto ambiental de suas ações e ampliando seus conhecimentos sobre consumo sustentável. O app oferece ferramentas para acompanhar o progresso individual e incentivar outros profissionais através de postagens.
              </Text>
            </View>

            {/* Email para Contato */}
            <View className='mb-6'>
              <Text className='text-xl font-bold mb-2 text-[#767676]'>Contato</Text>
              <Text className='text-base text-justify'>
                Para mais informações ou sugestões, entre em contato conosco pelo email: <Text className='text-[#87CEEB]'>agroboxcontato@gmail.com</Text>
              </Text>
            </View>

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default Sobre;
