import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GoBackButton from '../../Components/GoBackButton';
import ProfileImagesSection from '../../Components/profile/ProfileImagesSection';
import { removeRememberMeData } from '../../utils/async-storage/user-data';
import { removeToken, getToken } from '../../utils/session/manager';
import { getUserDetails } from '../../utils/session/user-data';
import { UserResponse } from '../../utils/types/user-response';

const MoreOptions = () => {
    const navigation = useNavigation();
    const [userProfile, setUserProfile] = useState<UserResponse | null>(null);

    // Busca os detalhes do usuário
    useEffect(() => {
        (async () => {
            try {
                const token = await getToken();
                if (!token) {
                    Alert.alert('Atenção', 'Você precisa realizar o login para acessar esta página.');
                    navigation.navigate('LogIn');
                    return;
                }

                const user = await getUserDetails();
                setUserProfile(user);
            } catch (error) {
                console.error('Erro ao buscar os detalhes do usuário:', error);
                Alert.alert('Erro', 'Não foi possível carregar os detalhes do usuário.');
            }
        })();
    }, []);

    const handleLogoutApp = async () => {
        await removeRememberMeData();
        await removeToken();
        navigation.navigate('Initial');
    };

    return (
        <SafeAreaView>
            <GoBackButton title="Perfil" />
            <View className="flex items-center justify-center mt-20">
                {/* Exibe o componente de imagem do perfil */}
                <ProfileImagesSection user={userProfile} />
                
                <View className="top-16 w-[90%] items-center gap-5">
                    <TouchableOpacity
                        className="bg-white w-[90%] h-12 my-2 rounded-md shadow flex-row items-center justify-between px-4"
                        onPress={() => navigation.navigate('PersonalData')}
                    >
                        <Ionicons name="person" size={30} color="#767676" />

                        <View className="flex-1 items-center">
                            <Text
                                className="text-[#767676] font-semibold text-[20px]"
                                style={{ fontFamily: 'poppins-medium' }}
                            >
                                Dados Pessoais
                            </Text>
                        </View>

                        <Ionicons name="chevron-forward" size={30} color="#767676" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-white w-[90%] h-12 my-2 rounded-md shadow flex-row items-center justify-between px-4"
                        onPress={() => navigation.navigate('Sobre')}
                    >
                        <Ionicons name="alert-circle" size={30} color="#767676" />

                        <View className="flex-1 items-center">
                            <Text
                                className="text-[#767676] font-semibold text-[20px]"
                                style={{ fontFamily: 'poppins-medium' }}
                            >
                                Sobre
                            </Text>
                        </View>

                        <Ionicons name="chevron-forward" size={30} color="#767676" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-white w-[90%] h-12 my-2 rounded-md shadow flex-row items-center justify-between px-4"
                        onPress={() => navigation.navigate('Help')}
                    >
                        <Ionicons name="help-circle-outline" size={30} color="#767676" />

                        <View className="flex-1 items-center">
                            <Text
                                className="text-[#767676] font-semibold text-[20px]"
                                style={{ fontFamily: 'poppins-medium' }}
                            >
                                Ajuda
                            </Text>
                        </View>

                        <Ionicons name="chevron-forward" size={30} color="#767676" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-white w-[90%] h-12 my-2 rounded-md shadow flex-row items-center justify-between px-4"
                        onPress={handleLogoutApp}
                    >
                        <Ionicons name="exit-outline" size={30} color="#767676" />

                        <View className="flex-1 items-center">
                            <Text
                                className="text-[#767676] font-semibold text-[20px]"
                                style={{ fontFamily: 'poppins-medium' }}
                            >
                                Sair
                            </Text>
                        </View>

                        <Ionicons name="chevron-forward" size={30} color="#767676" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default MoreOptions;
