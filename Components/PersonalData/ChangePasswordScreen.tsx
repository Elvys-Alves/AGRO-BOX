import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { getApiAxios } from '../../services/axios';
import { getUserDetails } from '../../utils/session/user-data';
import { userStore } from '../../utils/stores/user';
import GoBackButton from '../GoBackButton';
import { useUser } from '../profile/UserContext';
import HandleSaveButton from './HandleSaveButton';
import SuccessModal from './SuccessModal';

const ChangePasswordScreen = () => {
	let user = userStore.getState().user;

	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm({
		defaultValues: {
			currentPassword: '',
			newPassword: '',
		},
	});

	const [isChanged, setIsChanged] = React.useState(false);
	const [modalVisible, setModalVisible] = React.useState(false);
	const [showCurrentPassword, setShowCurrentPassword] =
		React.useState<boolean>(false);
	const [showNewPassword, setShowNewPassword] = React.useState<boolean>(false);

	const onSubmit = async (data: {
		currentPassword: string;
		newPassword: string;
	}) => {
		try {
			if (!user) {
				user = await getUserDetails();
			} else {
				const api = await getApiAxios();
				const response = await api.put(`/api/usuario/${user.email}`, {
					senha: data.newPassword,
				});
			}

			setIsChanged(false);
			setModalVisible(true);

			setTimeout(() => setModalVisible(false), 2000);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<SafeAreaView className="flex-1 mt-4 justify-center">
			<GoBackButton title="Senha" />

			<Text className="text-sm text-[#1F2B4D] ml-9 mt-8 w-10/12">
				Insira sua senha atual e a nova senha para alterar:
			</Text>

			<View className="flex items-center flex-1">
				{/* <View> */}
				<Text
					className="text-lg text-[#87CEEB] self-start ml-9 mt-4"
					style={{ fontFamily: 'poppins-medium' }}
				>
					Senha atual
				</Text>
				{/* </View> */}
				<View className="flex-row w-10/12 h-14 items-center border-2 rounded-full border-[#87CEEB] pl-2 mt-1 justify-between">
					<TouchableOpacity
						onPress={() => setShowCurrentPassword(!showCurrentPassword)}
						className="h-full items-center justify-center"
					>
						<Ionicons
							name={showCurrentPassword ? 'eye-off' : 'eye'}
							size={24}
							color={'#87CEEB'}
						/>
					</TouchableOpacity>
					<Controller
						control={control}
						name="currentPassword"
						rules={{
							required: 'Senha atual é obrigatória',
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								value={value}
								placeholder="Senha atual"
								secureTextEntry={!showCurrentPassword}
								onChangeText={(text) => {
									onChange(text);
									setIsChanged(true);
								}}
								onBlur={onBlur}
								className="w-11/12 h-full pl-2 text-[#B0BEC5] text-base"
								style={{ fontFamily: 'poppins-medium' }}
							/>
						)}
					/>
				</View>
				{errors.currentPassword && (
					<Text
						className="text-red-500 text-justify"
						style={{ fontFamily: 'poppins-regular' }}
					>
						{errors.currentPassword.message}
					</Text>
				)}

				<Text
					className="text-lg text-[#87CEEB] self-start ml-9 mt-6"
					style={{ fontFamily: 'poppins-medium' }}
				>
					Nova senha
				</Text>
				<View className="flex-row w-10/12 h-14 items-center border-2 rounded-full border-[#87CEEB] pl-2 mt-2">
					<TouchableOpacity
						onPress={() => setShowNewPassword(!showNewPassword)}
						className="h-full items-center justify-center"
					>
						<Ionicons
							name={showNewPassword ? 'eye-off' : 'eye'}
							size={24}
							color={'#87CEEB'}
						/>
					</TouchableOpacity>
					<Controller
						control={control}
						name="newPassword"
						rules={{
							required: 'Nova senha é obrigatória',
							minLength: {
								value: 3,
								message: 'A nova senha deve ter pelo menos três caracteres',
							},
							maxLength: {
								value: 51,
								message: 'A nova senha deve ter no máximo 51 caracteres',
							},
							pattern: {
								value:
									/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
								message:
									'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								value={value}
								placeholder="Nova senha"
								secureTextEntry={!showNewPassword}
								onChangeText={(text) => {
									onChange(text);
								}}
								onBlur={onBlur}
								className="w-full h-full pl-2 text-[#B0B3C5] text-base"
								style={{ fontFamily: 'poppins-medium' }}
							/>
						)}
					/>
				</View>
				{errors.newPassword && (
					<Text
						className="text-red-500 text-justify w-10/12"
						style={{ fontFamily: 'poppins-regular' }}
					>
						{errors.newPassword.message}
					</Text>
				)}

				<HandleSaveButton
					onPress={handleSubmit(onSubmit)}
					isChanged={isChanged}
				/>
			</View>

			<SuccessModal
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
			/>
		</SafeAreaView>
	);
};

export default ChangePasswordScreen;
