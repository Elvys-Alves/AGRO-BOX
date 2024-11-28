import { View, SafeAreaView, ScrollView } from 'react-native'; // Importa os componentes do React Native
import React from 'react'; // Importa o React para criar o componente
import ProfilePhotoPicker from '../../Components/PersonalData/ImagesPicker'; // Componente para selecionar a foto de perfil
import PersonalDataButton from '../../Components/PersonalData/PersonalDataButton'; // Botões personalizados para editar dados
import { useNavigation } from '@react-navigation/native'; // Hook de navegação do React Navigation
import GoBackButton from '../../Components/GoBackButton'; // Componente de botão para voltar
import { NavigationProp } from '../../utils/types/navigation'; // Tipagem de navegação personalizada

// Função do componente 'PersonalData', que exibe a tela de dados pessoais do usuário
const PersonalData: React.FC = () => {

  const navigation = useNavigation<NavigationProp>(); // Usando o hook useNavigation para acessar o objeto de navegação

  return (
    <SafeAreaView className='flex mt-4' > {/* SafeAreaView para garantir que o conteúdo fique dentro da área visível */}
      <ScrollView> {/* Permite rolar o conteúdo caso ele ultrapasse o tamanho da tela */}

        <GoBackButton title='Dados Pessoais' /> {/* Componente que renderiza o botão de voltar */}

        {/* Banner + Foto do Perfil */}
        <View className='mt-14 justify-center'> {/* Área de visualização e edição da foto de perfil */}

          <ProfilePhotoPicker /> {/* Componente para selecionar e exibir a foto de perfil */}

          <View className='mt-14 justify-center items-center' > {/* Área que contém os botões para editar os dados */}

            {/* Botões para navegar para as telas de edição de cada dado pessoal */}
            <PersonalDataButton onPress={() => navigation.navigate('ChangeName')} text='Nome' />
            <PersonalDataButton onPress={() => navigation.navigate('ChangeUsername')} text='Nome de Usuário' />
            <PersonalDataButton onPress={() => navigation.navigate('ChangeEmail')} text='Email' />
            <PersonalDataButton onPress={() => navigation.navigate('ChangePassword')} text='Senha' />

          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

export default PersonalData; // Exporta o componente para ser utilizado em outras partes da aplicação
