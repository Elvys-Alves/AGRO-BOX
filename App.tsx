import AntDesign from '@expo/vector-icons/AntDesign';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	NavigationContainer,
	ParamListBase,
	RouteProp,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import * as Screens from './screens/index';

import { useFonts } from 'expo-font';
import { View, Image} from 'react-native';
import { TabRoutes } from './utils/enums/tab-routes';
import { Platform } from 'react-native';
import { UserProvider } from './Components/profile/UserContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: (props) => renderTabIcon({ ...props, route }),
				tabBarStyle: {
					position: 'absolute',
					height: Platform.OS === 'ios' ? 70 : 55,
					borderTopWidth: 1,
					borderTopColor: '#87CEEB',
					backgroundColor: 'white',
				},
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: '#87CEEB',
			})}
		>
			<Tab.Screen name="Home" component={Screens.Home} />
			<Tab.Screen name="Upload" component={Screens.Upload} />
			<Tab.Screen name="Profile" component={Screens.Profile} />
		</Tab.Navigator>
	);
}

// Função para buscar o nome do icone e partir da propriedade focused(saber se o user está na página atual)
// e a partir do nome da rota
const getIconName = (routeName: string, focused?: boolean) => {
	let iconName: 'home' | 'user' | 'pluscircleo' = 'home';

	if (routeName === TabRoutes.HOME) {
		iconName = 'home';
	} else if (routeName === TabRoutes.PROFILE) {
		iconName = 'user';
	} else if (routeName === TabRoutes.UPLOAD) {
		iconName = 'pluscircleo';
	}

	return iconName;
};

const renderTabIcon = ({
	focused,
	color,
	size,
	route,
  }: {
	focused: boolean;
	color: string;
	size: number;
	route: RouteProp<ParamListBase, string>;
  }) => {
	// Se for a aba de "Profile", usaremos a imagem da árvore
	if (route.name === 'Profile') {
	  return (
		<View
		  style={{
			borderColor: focused ? '#87CEEB' : 'transparent',
			borderBottomWidth: focused ? 1 : 0,
			padding: 3,
		  }}
		>
		  {/* Imagem da árvore pequena */}
		  <Image
			source={require('./assets/icons/IconsLevel/arvore1.png')} // Caminho da imagem
			style={{ width: size, height: size }} // Ajusta o tamanho do ícone conforme a aba
		  />
		</View>
	  );
	}
  
	// Para as outras abas, mantemos os ícones do AntDesign
	const iconName = getIconName(route.name);
	return (
	  <View
		style={{
		  borderColor: focused ? '#87CEEB' : 'transparent',
		  borderBottomWidth: focused ? 1 : 0,
		  padding: 3,
		}}
	  >
		<AntDesign name={iconName} size={size} color={color} />
	  </View>
	);
  };


export default function App() {
	const [fontsLoaded] = useFonts({
		'poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
		'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
		'poppins-semi-bold': require('./assets/fonts/Poppins-SemiBold.ttf'),
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<UserProvider>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Initial">
					<Stack.Screen
						name="Quiz"
						component={Screens.Quiz}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Initial"
						component={Screens.Initial}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='QuizzResult'
						component={Screens.QuizzResult}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Main"
						component={TabNavigator}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="MoreOptions"
						component={Screens.MoreOptions}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Help"
						component={Screens.Help}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Sobre"
						component={Screens.Sobre}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="LogOut"
						component={Screens.LogOut}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="PersonalData"
						component={Screens.PersonalData}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="PostDetails"
						component={Screens.PostDetails}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="LogIn"
						component={Screens.LogIn}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="ForgotPassword"
						component={Screens.ForgotPassword}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Register"
						component={Screens.Register}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="PrivacyPolicy"
						component={Screens.PrivacyPolicy}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="ChangeName"
						component={Screens.ChangeNameScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="ChangeUsername"
						component={Screens.ChangeUsernameScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="ChangeEmail"
						component={Screens.ChangeEmailScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="ChangePassword"
						component={Screens.ChangePasswordScreen}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</UserProvider>
	);
}
