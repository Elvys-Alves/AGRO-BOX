import { View, Text, SafeAreaView, TouchableOpacity } from "react-native"; 
import React, { useState } from "react"; 
import { useNavigation } from '@react-navigation/native'; 
import { RootStackParamList } from "../../utils/types/navigation"; 
import { StackNavigationProp } from "@react-navigation/stack";

// Define o tipo de navegação usando o RootStackParamList, que contém todas as rotas do app.
type NavigationProp = StackNavigationProp<RootStackParamList>;

const Quiz = () => {
    // Inicializa a navegação.
    const navigation = useNavigation<NavigationProp>();

    // Definindo o array de perguntas, cada uma com suas opções e a opção correta.
    const questions = [
        {
            question: "Você realiza o descarte correto de materiais como seringas, agulhas e luvas?",
            options: [
                "Sempre.",
                "Às vezes.",
                "Raramente.",
                "Nunca."
            ],
            correctOption: 0, // Indica que a opção "Sempre." é a correta.
        },
        {
            question: "Quando compro materiais veterinários, priorizo produtos com embalagens recicláveis?",
            options: [
                "Sim.",
                "Às vezes.",
                "Nunca pensei sobre isso antes.",
                "Não, eu prefiro comprar os mais baratos."
            ],
            correctOption: 0,
        },
        {
            question: "Você incentiva a reciclagem de materiais nos consultórios ou clínicas veterinárias?",
            options: [
                "Sim, procuro sempre incentivar.",
                "Às vezes, mas sem incentivo formal.",
                "Não, nunca pensei em incentivar.",
                "Não, não vejo a necessidade."
            ],
            correctOption: 0,
        },
        {
            question: "Você realiza o reaproveitamento de materiais como bandagens e gazes sempre que possível?",
            options: [
                "Sim, sempre que é seguro.",
                "Às vezes, quando sobra material.",
                "Raramente, depende do caso.",
                "Nunca, prefiro usar tudo novo."
            ],
            correctOption: 0,
        },
        {
            question: "Você costuma separar corretamente os resíduos hospitalares para descarte ambientalmente correto?",
            options: [
                "Sim.",
                "Às vezes, mas não sempre.",
                "Raramente, nunca aprendi sobre isso.",
                "Não, não me preocupo com isso."
            ],
            correctOption: 0,
        },
    ];

    // Estado para controlar o índice da pergunta atual e as opções selecionadas.
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>(Array(questions.length).fill(null));

    // Função que lida com a seleção de uma opção, atualizando o estado.
    const handleOptionSelect = (optionIndex: number) => {
        const updatedSelectedOptions = [...selectedOptions];
        updatedSelectedOptions[questionIndex] = optionIndex;
        setSelectedOptions(updatedSelectedOptions);
    };

    // Função para avançar para a próxima pergunta, se uma opção for selecionada.
    const handleNextQuestion = () => {
        if (selectedOptions[questionIndex] !== null && questionIndex < questions.length - 1) {
            setQuestionIndex(questionIndex + 1);
        }
    };

    // Função para voltar à pergunta anterior.
    const handlePreviousQuestion = () => {
        if (questionIndex > 0) {
            setQuestionIndex(questionIndex - 1);
        }
    };

    // Função para submeter o quiz, calculando a pontuação e navegando para o resultado.
    const handleSubmit = () => {
        let calculatedScore = 0;
        selectedOptions.forEach((selectedOption, index) => {
            if (selectedOption === questions[index].correctOption) {
                calculatedScore += 1;
            }
        });

        // Navega para a tela de resultados passando a pontuação e o total de perguntas.
        navigation.navigate('QuizzResult', { score: calculatedScore, total: questions.length });
    };

    // Condicional para desabilitar os botões dependendo das opções selecionadas.
    const isNextButtonDisabled = selectedOptions[questionIndex] === null;
    const isSubmitButtonDisabled = selectedOptions.includes(null);

    return (
        <SafeAreaView className="flex-1 bg-[#F9F9F9] justify-center p-5">
            {/* Título e indicação da pergunta atual */}
            <View className="items-center mb-5">
                <Text className="text-4xl font-bold text-[#87CEEB]">
                    QUIZ
                </Text>
                <Text className="text-2xl font-bold text-[#87CEEB]">
                    Pergunta {questionIndex + 1} de {questions.length}
                </Text>
            </View>

            {/* Exibe a pergunta atual */}
            <Text className="text-lg font-bold text-[#87CEEB] mb-3 text-center">
                {questions[questionIndex].question}
            </Text>

            {/* Exibe as opções de resposta para a pergunta atual */}
            {questions[questionIndex].options.map((option, optionIndex) => (
                <TouchableOpacity
                    key={optionIndex}
                    className={`flex-row items-center p-3 rounded-full my-2 ${selectedOptions[questionIndex] === optionIndex ? 'bg-gray-300' : 'bg-[#87CEEB]'}`}
                    onPress={() => handleOptionSelect(optionIndex)}
                >
                    <Text className="text-white font-bold">{option}</Text>
                </TouchableOpacity>
            ))}

            {/* Botões de navegação para avançar e voltar perguntas */}
            <View className="flex-row justify-between mt-5">
                {/* Botão para voltar à pergunta anterior */}
                <TouchableOpacity
                    onPress={handlePreviousQuestion}
                    disabled={questionIndex === 0}
                    className={`py-3 px-6 rounded-full ${questionIndex === 0 ? 'bg-gray-300' : 'bg-[#87CEEB]'}`}
                >
                    <Text className="text-white">Voltar</Text>
                </TouchableOpacity>

                {/* Botão para avançar ou submeter o quiz */}
                {questionIndex === questions.length - 1 ? (
                    <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={isSubmitButtonDisabled}
                        className={`py-3 px-6 rounded-full ${isSubmitButtonDisabled ? 'bg-gray-300' : 'bg-[#87CEEB]'}`}
                    >
                        <Text className="text-white">Enviar</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleNextQuestion}
                        disabled={isNextButtonDisabled}
                        className={`py-3 px-6 rounded-full ${isNextButtonDisabled ? 'bg-gray-300' : 'bg-[#87CEEB]'}`}
                    >
                        <Text className="text-white">Próxima</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Quiz;
