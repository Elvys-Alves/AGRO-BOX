import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { axiosLogin } from '../../services/axios';
import {
	checkIsRemember,
	removeRememberMeData,
	storeRememberMeData,
} from '../../utils/async-storage/user-data';
import { getToken, saveToken } from '../../utils/session/manager';
import { LoginFormData } from '../../utils/types/form/formData';
import { NavigationProp } from '../../utils/types/navigation';
import { TokenResponse } from '../../utils/types/token';

// Componente principal da tela de login
export default function LogIn() {
	const navigation = useNavigation<NavigationProp>(); // Hook para navegação
	const [rememberMe, setRememberMe] = useState(false); // Estado para o checkbox "Lembrar-me"
	const { control, handleSubmit, formState } = useForm<LoginFormData>(); // Hook de formulário
	const { isSubmitting } = formState; // Estado do formulário (ex: se está submetendo)

	// Função para manipular o envio do formulário de login
	const handleLoginFormSubmit = async (data: LoginFormData) => {
		try {
			// Realiza a requisição para login e recebe o token
			const { data: tokenObject } = await axiosLogin.post<TokenResponse>(
				'/api/usuario/login', // Endpoint do login
				{
					email: data.email, // Dados do formulário
					senha: data.password,
				},
			);

			console.log('Token recebido:', tokenObject.token); // Exibe o token no console para debug

			await saveToken(tokenObject.token); // Salva o token na sessão

			if (rememberMe) {
				await storeRememberMeData(); // Salva a escolha de "Lembrar-me" caso esteja marcado
			} else {
				await removeRememberMeData(); // Remove os dados caso não esteja marcado
			}

			alert('Login realizado com sucesso!'); // Alerta de sucesso
			navigation.navigate('Main'); // Redireciona para a tela principal
		} catch (error: any) {
			console.error(error.response); // Loga erros no console
		}
	};

	// Hook que executa sempre que a tela ganha foco
	useFocusEffect(
		React.useCallback(() => {
			(async () => {
				const isRemember = await checkIsRemember(); // Verifica se "Lembrar-me" está ativo
				const token = await getToken(); // Verifica se há um token salvo
				if (isRemember && token) navigation.navigate('Main'); // Redireciona para "Main" caso válido
			})();
			return () => {};
		}, []),
	);

	return (
		// Ajusta a tela para evitar sobreposição pelo teclado
		<KeyboardAvoidingView
			className="flex-1 bg-[#F9F9F9]"
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			{/* Permite rolagem vertical da tela */}
			<ScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				className="bg-[#F9F9F9]"
			>
				<View className="flex-1 justify-center items-center bg-[#F9F9F9]">
					<View className="w-4/5">
						{/* Títulos da tela */}
						<Text
							style={{ fontFamily: 'poppins-semi-bold' }}
							className="text-[#87CEEB] mb-3 font-bold text-3xl text-center"
						>
							Bem-vindo de volta!
						</Text>
						<Text className="text-base text-[#455A64] mb-2 text-center">
							Faça login na sua conta
						</Text>

						{/* Campo de email */}
						<View className="mb-4">
							<View className="flex-row items-center mb-2">
								<Ionicons name="person-sharp" size={20} />
								{/* Ícone de pessoa */}
								<Text className="ml-1 text-[#455A64]">Email</Text>
							</View>

							<Controller
								control={control} // Controle do formulário
								name="email" // Nome do campo
								rules={{
									required: 'O Email ou Nome de Usuario é obrigatorio', // Validações
									minLength: {
										value: 3,
										message: 'Este campo deve ter no minimo 3 caracteres',
									},
									maxLength: {
										value: 51,
										message: 'Limite excedido de caracteres',
									},
								}}
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<>
										{/* Input do email */}
										<TextInput
											className="border border-[#87CEEB] bg-[#F9F9F9] shadow px-4 py-4 rounded-3xl"
											placeholder="Email"
											value={value}
											onChangeText={onChange}
											keyboardType="email-address"
											autoCapitalize="none"
										/>
										{/* Mensagem de erro */}
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

						{/* Campo de senha */}
						<View className="mb-4">
							<View className="flex-row items-center mb-2">
								<Ionicons name="lock-closed" size={20} />
								{/* Ícone de cadeado */}
								<Text className="ml-1 text-[#455A64]">Senha</Text>
							</View>

							<Controller
								control={control}
								name="password"
								rules={{
									required: 'A senha é obrigatoria',
									minLength: {
										value: 3,
										message: 'A senha deve ter pelo menos 3 caracteres',
									},
									maxLength: {
										value: 51,
										message: 'Limite excedido de caracteres',
									},
								}}
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<>
										{/* Input da senha */}
										<TextInput
											className="border border-[#87CEEB] bg-[#F9F9F9] shadow rounded-3xl px-4 py-4"
											placeholder="Digite sua senha"
											value={value}
											onChangeText={onChange}
											secureTextEntry={true}
											autoCapitalize="none"
										/>
										{/* Mensagem de erro */}
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

						{/* Opções adicionais: Lembrar-me e esqueci a senha */}
						<View className="flex-row justify-between items-center mb-6">
							<View className="flex-row items-center">
								<TouchableOpacity
									className={`shadow w-6 h-6 rounded-sm border-2 ${
										rememberMe ? 'bg-[#D9D9D9]' : 'border-[#87CEEB]'
									}`}
									onPress={() => setRememberMe(!rememberMe)}
								>
									{rememberMe && (
										<View className="w-full h-full bg-[#87CEEB]">
											<Ionicons
												name="checkbox-outline"
												size={20}
												color="white"
											/>
										</View>
									)}
								</TouchableOpacity>

								<Text className="text-gray-700 ml-2">Lembrar de Mim</Text>
								<TouchableOpacity
									onPress={() => navigation.navigate('ForgotPassword')}
								>
									<Text className="shadow text-sm text-[#87CEEB] ml-6">
										Esqueceu sua senha?
									</Text>
								</TouchableOpacity>
							</View>
						</View>

						{/* Botão de login */}
						<TouchableOpacity
							className="w-full bg-[#87CEEB] shadow-lg py-2 mb-4 rounded-3xl"
							onPress={handleSubmit(handleLoginFormSubmit)}
							disabled={isSubmitting}
						>
							<Text className="text-center text-white text-lg">Entrar</Text>
						</TouchableOpacity>

						{/* Link para registro */}
						<View className="flex-row justify-center items-center mb-4">
							<Text className="text-gray-700">Ainda não tem uma conta?</Text>
							<TouchableOpacity
								className="shadow text-[#767676]"
								onPress={() => navigation.navigate('Register')}
							>
								<Text className="font-semibold text-sm text-[#87CEEB] ml-1">
									Cadastre-se
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
