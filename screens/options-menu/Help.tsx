import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GoBackButton from '../../Components/GoBackButton';

const Help = () => {
    // Estados para controlar a expansão de cada seção
    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpandedQuest1, setIsExpandedQuest1] = useState(false);
    const [isExpandedQuest2, setIsExpandedQuest2] = useState(false);
    const [isExpandedQuest3, setIsExpandedQuest3] = useState(false);
    const [isExpandedQuest4, setIsExpandedQuest4] = useState(false);

    // Função para alternar entre expandido e recolhido para o guia de perfil consumidor verde
    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    // Funções para alternar entre expandido e recolhido para cada pergunta frequente
    const toggleExpansionQuest1 = () => {
        setIsExpandedQuest1(!isExpandedQuest1);
    };
    const toggleExpansionQuest2 = () => {
        setIsExpandedQuest2(!isExpandedQuest2);
    };
    const toggleExpansionQuest3 = () => {
        setIsExpandedQuest3(!isExpandedQuest3);
    };
    const toggleExpansionQuest4 = () => {
        setIsExpandedQuest4(!isExpandedQuest4);
    };

    return (
        <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
            {/* Botão de voltar */}
            <GoBackButton title='Ajuda' />

            {/* Título do Guia */}
            <View className='items-center justify-center mt-16'>
                <Text className='text-[22px] font-semibold text-[#767676] rounded p-1' style={{ fontFamily: 'poppins-medium' }}>
                    Guia de Árvores
                </Text>

                {/* Seção para exibir informações do Guia de Perfil Consumidor Verde */}
                <TouchableOpacity
                    onPress={toggleExpansion} // Alterna entre expandir e recolher a seção
                    className='bg-[#D9D9D9] h-[50px] w-[90%] rounded-md justify-between items-center flex-row px-4 mt-4'
                >
                    <Text className='text-[14px] font-semibold text-black' style={{ fontFamily: 'poppins-medium' }}>
                        Guia de Perfil Consumidor Verde
                    </Text>
                    <Ionicons name="help-circle" size={20} color="black" />
                </TouchableOpacity>

                {/* Exibe informações quando a seção é expandida */}
                {isExpanded && (
                    <ScrollView style={{ width: '90%' }}>
                        <View className='bg-[#D9D9D9] mt-2 p-3 rounded-md'>
                            {/* Card de cada nível de consumidor verde */}
                            <View className='flex items-center justify-center'>
                                <View className='bg-white w-[97%] h-32 my-2 rounded-md shadow flex-row items-center relative'>
                                    <View className='w-[70px] h-[70px] border-2 border-[#50B454] rounded-full justify-center items-center overflow-hidden ml-4'>
                                        <Image
                                            source={require('../../assets/icons/IconsLevel/arvore0.png')}
                                            className='h-[100px] w-[100px]'
                                        />
                                    </View>
                                    <View className='flex-1 ml-3'>
                                        <Text className='text-[#50B454] text-[14px] font-semibold' style={{ fontFamily: 'poppins-medium' }}>
                                            Consumidor Iniciante
                                        </Text>
                                        <Text className='text-[10px] mt-1 text-[#767676] break-words' style={{ fontFamily: 'poppins-medium' }}>
                                            Está começando a entender o impacto do consumo!
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {/* Repetir o mesmo padrão para os outros níveis */}
                            <View className='flex items-center justify-center'>
                                <View className='bg-white w-[97%] h-32 my-2 rounded-md shadow flex-row items-center relative'>
                                    <View className='w-[70px] h-[70px] border-2 border-[#50B454] rounded-full justify-center items-center overflow-hidden ml-4'>
                                        <Image
                                            source={require('../../assets/icons/IconsLevel/arvore1.png')}
                                            className='h-[70px] w-[70px]'
                                        />
                                    </View>
                                    <View className='flex-1 ml-3'>
                                        <Text className='text-[#50B454] text-[14px] font-semibold' style={{ fontFamily: 'poppins-medium' }}>
                                            Consumidor Verde
                                        </Text>
                                        <Text className='text-[10px] mt-1 text-[#767676] break-words' style={{ fontFamily: 'poppins-medium' }}>
                                            Já faz escolhas mais conscientes e sustentáveis!
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View className='flex items-center justify-center'>
                                <View className='bg-white w-[97%] h-32 my-2 rounded-md shadow flex-row items-center relative'>
                                    <View className='w-[70px] h-[70px] border-2 border-[#50B454] rounded-full justify-center items-center overflow-hidden ml-4'>
                                        <Image
                                            source={require('../../assets/icons/IconsLevel/arvore2.png')}
                                            className='h-[70px] w-[70px]'
                                        />
                                    </View>
                                    <View className='flex-1 ml-3'>
                                        <Text className='text-[#50B454] text-[14px] font-semibold' style={{ fontFamily: 'poppins-medium' }}>
                                            Consumidor Verde Responsável
                                        </Text>
                                        <Text className='text-[10px] mt-1 text-[#767676] break-words' style={{ fontFamily: 'poppins-medium' }}>
                                            Se preocupa com o reaproveitamento e descarte correto!
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View className='flex items-center justify-center'>
                                <View className='bg-white w-[97%] h-32 my-2 rounded-md shadow flex-row items-center relative'>
                                    <View className='w-[70px] h-[70px] border-2 border-[#50B454] rounded-full justify-center items-center overflow-hidden ml-4'>
                                        <Image
                                            source={require('../../assets/icons/IconsLevel/arvore3.png')}
                                            className='h-[70px] w-[70px]'
                                        />
                                    </View>
                                    <View className='flex-1 ml-3'>
                                        <Text className='text-[#50B454] text-[14px] font-semibold' style={{ fontFamily: 'poppins-medium' }}>
                                            Consumidor Verde Experiente
                                        </Text>
                                        <Text className='text-[10px] mt-1 text-[#767676] break-words' style={{ fontFamily: 'poppins-medium' }}>
                                            É um exemplo de consumo sustentável!
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {/* Seção para o consumidor ostentador */}
                            <View className='flex items-center justify-center'>
                                <View className='bg-white w-[97%] h-32 my-2 rounded-md shadow flex-row items-center relative'>
                                    <View className='w-[70px] h-[70px] border-2 border-[#FF6347] rounded-full justify-center items-center overflow-hidden ml-4'>
                                        <Image
                                            source={require('../../assets/icons/IconsLevel/arvore1.1.png')}
                                            className='h-[70px] w-[70px]'
                                        />
                                    </View>
                                    <View className='flex-1 ml-3'>
                                        <Text className='text-[#FF6347] text-[14px] font-semibold' style={{ fontFamily: 'poppins-medium' }}>
                                            Consumidor Ostentador
                                        </Text>
                                        <Text className='text-[10px] mt-1 text-[#767676] break-words' style={{ fontFamily: 'poppins-medium' }}>
                                            Busca status através do consumo, sem considerar o impacto ambiental!
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                )}

                {/* Título das Perguntas Frequentes */}
                <Text className='text-[22px] font-semibold text-[#767676] rounded p-1 mt-16' style={{ fontFamily: 'poppins-medium' }}>
                    Perguntas Frequentes
                </Text>

                {/* Pergunta 1 */}
                <View className='items-center'>
                    <TouchableOpacity
                        onPress={toggleExpansionQuest1} // Alterna entre expandir e recolher a pergunta
                        className='bg-[#D9D9D9] h-[50px] w-[90%] rounded-md justify-between items-center flex-row px-4 mt-4'
                    >
                        <Text className='text-[14px] font-semibold text-[#000000]' style={{ fontFamily: 'poppins-medium' }}>
                            O que são essas árvores?
                        </Text>
                        <Ionicons name="help-circle" size={20} color="black" />
                    </TouchableOpacity>

                    {/* Exibe resposta para a pergunta 1 quando expandida */}
                   
                    {isExpandedQuest1 && (
                        <View className='bg-[#D9D9D9] p-4 rounded-md mt-2'>
                            <Text className='text-[12px] text-[#767676]' style={{ fontFamily: 'poppins-medium' }}>
                                As árvores representam diferentes níveis de consciência ambiental do consumidor. Cada nível reflete o comportamento e as escolhas que fazem em relação ao consumo sustentável.
                            </Text>
                        </View>
                    )}
                </View>

                {/* Pergunta 2 */}
                <View className='items-center'>
                    <TouchableOpacity
                        onPress={toggleExpansionQuest2} // Alterna entre expandir e recolher a pergunta
                        className='bg-[#D9D9D9] h-[50px] w-[90%] rounded-md justify-between items-center flex-row px-4 mt-4'
                    >
                        <Text className='text-[14px] font-semibold text-[#000000]' style={{ fontFamily: 'poppins-medium' }}>
                            Como posso melhorar meu nível de consciência?
                        </Text>
                        <Ionicons name="help-circle" size={20} color="black" />
                    </TouchableOpacity>

                    {/* Exibe resposta para a pergunta 2 quando expandida */}
                    {isExpandedQuest2 && (
                        <View className='bg-[#D9D9D9] p-4 rounded-md mt-2'>
                            <Text className='text-[12px] text-[#767676]' style={{ fontFamily: 'poppins-medium' }}>
                                Para melhorar seu nível de consciência, comece fazendo escolhas mais sustentáveis no seu consumo diário, como optar por produtos eco-friendly, reutilizar e reciclar materiais e apoiar marcas que adotam práticas ambientais responsáveis.
                            </Text>
                        </View>
                    )}
                </View>

                {/* Pergunta 3 */}
                <View className='items-center'>
                    <TouchableOpacity
                        onPress={toggleExpansionQuest3} // Alterna entre expandir e recolher a pergunta
                        className='bg-[#D9D9D9] h-[50px] w-[90%] rounded-md justify-between items-center flex-row px-4 mt-4'
                    >
                        <Text className='text-[14px] font-semibold text-[#000000]' style={{ fontFamily: 'poppins-medium' }}>
                            O que é um consumidor responsável?
                        </Text>
                        <Ionicons name="help-circle" size={20} color="black" />
                    </TouchableOpacity>

                    {/* Exibe resposta para a pergunta 3 quando expandida */}
                    {isExpandedQuest3 && (
                        <View className='bg-[#D9D9D9] p-4 rounded-md mt-2'>
                            <Text className='text-[12px] text-[#767676]' style={{ fontFamily: 'poppins-medium' }}>
                                Um consumidor responsável é alguém que se preocupa com as consequências ambientais de suas escolhas de consumo, tomando atitudes para reduzir o impacto no meio ambiente, como o reaproveitamento e o descarte correto de produtos.
                            </Text>
                        </View>
                    )}
                </View>

                {/* Pergunta 4 */}
                <View className='items-center'>
                    <TouchableOpacity
                        onPress={toggleExpansionQuest4} // Alterna entre expandir e recolher a pergunta
                        className='bg-[#D9D9D9] h-[50px] w-[90%] rounded-md justify-between items-center flex-row px-4 mt-4'
                    >
                        <Text className='text-[14px] font-semibold text-[#000000]' style={{ fontFamily: 'poppins-medium' }}>
                            Como posso ajudar na conscientização ambiental?
                        </Text>
                        <Ionicons name="help-circle" size={20} color="black" />
                    </TouchableOpacity>

                    {/* Exibe resposta para a pergunta 4 quando expandida */}
                    {isExpandedQuest4 && (
                        <View className='bg-[#D9D9D9] p-4 rounded-md mt-2'>
                            <Text className='text-[12px] text-[#767676]' style={{ fontFamily: 'poppins-medium' }}>
                                Você pode ajudar na conscientização ambiental ao compartilhar informações sobre consumo sustentável, participar de eventos e iniciativas ecológicas e educar as pessoas sobre os impactos do consumo irresponsável.
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

export default Help;
