import { useNavigation } from '@react-navigation/native'; // Hook para navegação entre telas
import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'; // Componentes básicos do React Native
import 'tailwindcss/tailwind.css'; // Estilos base utilizando TailwindCSS
import { StackNavigationProp } from '@react-navigation/stack'; // Tipo de navegação da pilha
import { Controller, useForm } from 'react-hook-form'; // Hooks do react-hook-form para gerenciar formulários
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ícones para a interface
import { axiosLogin } from '../../services/axios'; // Função de requisição para API de login
import { RegisterFormData } from '../../utils/types/form/formData'; // Tipo de dados para o formulário
import { RootStackParamList } from '../../utils/types/navigation'; // Tipos de navegação

// Tipo de navegação para a tela de registro
type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function Register() {
  // Navegação para outras telas
  const navigation = useNavigation<NavigationProp>();

  // Gerenciamento do formulário usando react-hook-form
  const { control, handleSubmit, getValues, formState } = useForm<RegisterFormData>();
  const { isSubmitting } = formState; // Verifica se o formulário está sendo enviado

  // Função para lidar com o envio do formulário
  const handleRegisterFormSubmit = async (data: RegisterFormData) => {
    try {
      // Requisição para a API para registrar um novo usuário
      const { data: message } = await axiosLogin.post('/api/usuario', {
        email: data.email,
        senha: data.password,
        nome: data.username,
        nivelConsciencia: 4,
        isMonitor: true,
        tokens: `${Math.random()}`,
        telefone: '123232323',
      });

      alert('Perfil criado com sucesso!');
      // Navega para a tela de Quiz após o registro bem-sucedido
      navigation.navigate('Quiz');
    } catch (error) {
      console.error(error); // Exibe o erro no console se ocorrer uma falha
    }
  };

  return (
    // View que gerencia o comportamento do teclado, especialmente no iOS
    <KeyboardAvoidingView
      className="flex-1 bg-[#F9F9F9]"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex-1 justify-center items-center bg-[#F9F9F9]">
        <View className="w-4/5">
          {/* Título da tela */}
          <Text
            style={{ fontFamily: 'poppins-semi-bold' }}
            className="text-center text-[#87CEEB] mb-3 font-bold text-3xl"
          >
            Bem-vindo
          </Text>
          <Text className="text-center text-[#455A64] mb-2">Crie sua conta</Text>

          {/* Campo de Nome de Usuário */}
          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="person-sharp" size={20} />
              <Text className="ml-1 text-[#455A64]">Usuário</Text>
            </View>
            <Controller
              control={control}
              name="username"
              rules={{
                required: 'Nome de Usuário é obrigatório', // Validação: campo obrigatório
                minLength: {
                  value: 3,
                  message: 'Nome de Usuário deve ter no mínimo 3 caracteres', // Validação de comprimento mínimo
                },
                maxLength: {
                  value: 51,
                  message: 'Limite excedido de caracteres', // Validação de comprimento máximo
                },
              }}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <>
                  <TextInput
                    className="border border-[#87CEEB] bg-[#F9F9F9] shadow px-4 py-4 rounded-full"
                    placeholder="Nome de Usuário"
                    value={value}
                    onChangeText={onChange}
                    autoCapitalize="none"
                  />
                  {error && (
                    <Text
                      style={{ fontFamily: 'poppins-semi-bold' }}
                      className="text-[#ff375b] text-xs ml-2"
                    >
                      {error.message} {/* Exibe mensagem de erro se houver */}
                    </Text>
                  )}
                </>
              )}
            />
          </View>

          {/* Campo de Email */}
          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="mail" size={20} />
              <Text className="ml-1 text-[#455A64]">Email</Text>
            </View>
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email é obrigatório', // Validação: campo obrigatório
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validação de formato de email
                  message: 'Email inválido',
                },
              }}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <>
                  <TextInput
                    className="border border-[#87CEEB] bg-[#F9F9F9] shadow px-4 py-4 rounded-full"
                    placeholder="Digite seu Email"
                    value={value}
                    onChangeText={onChange}
                    autoCapitalize="none"
                    keyboardType="email-address" // Tipo de teclado para emails
                  />
                  {error && (
                    <Text
                      style={{ fontFamily: 'poppins-semi-bold' }}
                      className="text-[#ff375b] text-xs ml-2"
                    >
                      {error.message} {/* Exibe mensagem de erro se houver */}
                    </Text>
                  )}
                </>
              )}
            />
          </View>

          {/* Campo de Senha */}
          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="lock-closed" size={20} />
              <Text className="ml-1 text-[#455A64]">Senha</Text>
            </View>
            <Controller
              control={control}
              name="password"
              rules={{
                required: 'A senha é obrigatória',
                minLength: {
                  value: 3,
                  message: 'A senha deve ter pelo menos 3 caracteres', // Validação de comprimento mínimo
                },
                maxLength: {
                  value: 51,
                  message: 'Limite excedido de caracteres', // Validação de comprimento máximo
                },
              }}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <>
                  <TextInput
                    className="border border-[#87CEEB] bg-[#F9F9F9] shadow px-4 py-4 rounded-full"
                    placeholder="Digite sua senha"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={true} // Torna a senha invisível
                    autoCapitalize="none"
                  />
                  {error && (
                    <Text
                      style={{ fontFamily: 'poppins-semi-bold' }}
                      className="text-[#ff375b] text-xs ml-2"
                    >
                      {error.message}
                    </Text>
                  )}
                </>
              )}
            />
          </View>

          {/* Campo de Confirmar Senha */}
          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="lock-closed" size={20} />
              <Text className="ml-1 text-[#455A64]">Confirmar senha</Text>
            </View>
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: 'Por favor, repita a senha',
                validate: (value) =>
                  value === getValues('password') || 'As senhas não correspondem', // Validação se as senhas são iguais
                minLength: {
                  value: 3,
                  message: 'A senha deve ter pelo menos 3 caracteres',
                },
                maxLength: {
                  value: 51,
                  message: 'Limite excedido de caracteres',
                },
              }}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <>
                  <TextInput
                    className="border border-[#87CEEB] bg-[#F9F9F9] shadow px-4 py-4 rounded-full"
                    placeholder="Digite sua senha novamente"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={true}
                    autoCapitalize="none"
                  />
                  {error && (
                    <Text
                      style={{ fontFamily: 'poppins-semi-bold' }}
                      className="text-[#ff375b] text-xs ml-2"
                    >
                      {error.message}
                    </Text>
                  )}
                </>
              )}
            />
          </View>

          {/* Botão de envio do formulário */}
          <TouchableOpacity
            className="w-full bg-[#87CEEB] py-4 mb-4 rounded-full"
			onPress={handleSubmit(handleRegisterFormSubmit)} // Envia o formulário para a função handleRegisterFormSubmit
            disabled={isSubmitting} // Desabilita o botão enquanto o formulário está sendo submetido
          >
            <Text className="text-center text-white text-lg">Registrar</Text>
          </TouchableOpacity>
        </View>

        {/* Link para quem já tem uma conta e deseja fazer login */}
        <View className="flex-row justify-center items-center mb-4">
          <View className="flex-row justify-center items-center">
            <Text className="text-[#455A64]">Já tem uma conta?</Text>
          </View>
          <TouchableOpacity
            className="shadow text-[#87CEEB]" 
            onPress={() => navigation.navigate('LogIn')} // Navega para a tela de login
          >
            <Text className="font-semibold text-sm text-[#87CEEB] ml-1">
              Entrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

