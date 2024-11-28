// Importação de componentes e bibliotecas essenciais
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native'; // Componentes básicos do React Native
import React from 'react'; // Biblioteca React
import { useForm, Controller } from 'react-hook-form'; // Biblioteca para gerenciamento de formulários
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ícones do Ionicons
import { useNavigation } from '@react-navigation/native'; // Hook para navegar entre telas
import { StackNavigationProp } from "@react-navigation/stack"; // Tipo de navegação em pilha
import { RootStackParamList } from "../../utils/types/navigation"; // Tipagem personalizada da navegação
import { ForgotFormData } from "../../utils/types/form/formData"; // Tipagem para os dados do formulário

// Tipo da navegação para garantir segurança e autocompletar ao navegar
type NavigationProp = StackNavigationProp<RootStackParamList>;

// Componente principal para a tela de recuperação de senha
export default function ForgotPassword() {
    // Hook do react-hook-form para controle do formulário
    const { control, handleSubmit } = useForm<ForgotFormData>();

    // Hook para navegação entre telas
    const navigation = useNavigation<NavigationProp>();

    return (
        // Componente para ajustar o teclado com segurança ao digitar
        <KeyboardAvoidingView
            className='flex-1 bg-[#F9F9F9]'
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {/* Componente que permite rolagem vertical */}
            <ScrollView 
                className='flex-1 bg-[#F9F9F9]' 
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            >
                {/* Contêiner centralizado */}
                <View className='items-center'>

                    {/* Título e instruções */}
                    <View className='flex justify-center items-center mb-8'>
                        <Text style={{ fontFamily: 'poppins-semi-bold' }} 
                              className='text-[#87CEEB] mb-4 font-bold text-3xl ml-1'>
                            Esqueceu sua senha?
                        </Text>
                        <Text 
                            className='text-[#87CEEB] ml-1 mb-8 text-center w-[322px] font-bold'>
                            Digite o endereço de e-mail cadastrado.
                        </Text>
                    </View>

                    {/* Campo de entrada para o e-mail */}
                    <View className='w-4/5 mb-10'>
                        <View className='flex-row items-center mb-4 mr-5'>
                            <Ionicons name='mail' size={20} /> {/* Ícone de e-mail */}
                            <Text className='ml-1 text-[#455A64]'>Email</Text>
                        </View>

                        {/* Componente controlado pelo react-hook-form */}
                        <Controller
                            control={control} // Controlador do formulário
                            name='email' // Nome do campo
                            rules={{
                                required: "O Email é obrigatório", // Validação obrigatória
                                maxLength: {
                                    value: 51,
                                    message: "Limite excedido de caracteres"
                                },
                                pattern: {
                                    value: /^[^@]+@[^@]+\.[^@]+$/,
                                    message: 'Email inválido'
                                }
                            }}
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                <>
                                    {/* Campo de texto para e-mail */}
                                    <TextInput
                                        className='border border-[#87CEEB] bg-[#F9F9F9] shadow rounded-3xl px-4 py-4'
                                        placeholder='Digite seu Email'
                                        onChangeText={onChange}
                                        value={value}
                                        keyboardType='email-address'
                                        autoCapitalize='none'
                                    />
                                    {/* Exibição de mensagem de erro */}
                                    {error && 
                                        <Text
                                            style={{ fontFamily: 'poppins-semi-bold' }}
                                            className='text-[#ff375b] text-xs ml-2'>
                                            {error.message}
                                        </Text>}
                                </>
                            )}
                        />
                    </View>

                    {/* Botão de envio */}
                    <TouchableOpacity
                        className='w-4/5 bg-[#87CEEB] shadow-lg py-4 mb-5 rounded-3xl'
                        onPress={handleSubmit((data) => { // Submete o formulário
                            console.log(data); // Exibe os dados no console
                        })}
                    >
                        <Text className='text-center text-white text-lg'>Enviar</Text>
                    </TouchableOpacity>

                    {/* Link para voltar ao login */}
                    <View className='flex-row justify-center items-center mb-4'>
                        <TouchableOpacity
                            className='shadow text-[#767676]'
                            onPress={() => navigation.navigate('LogIn')} // Navega para a tela de login
                        >
                            <Text className='text-sm text-[#87CEEB] ml-1 underline'>
                                Clique aqui para voltar!
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
