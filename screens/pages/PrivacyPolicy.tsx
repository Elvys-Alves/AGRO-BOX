import { Text, View } from 'react-native'; // Importação de componentes básicos do React Native.
import { ScrollView } from 'react-native-gesture-handler'; // Importação do ScrollView para permitir rolagem do conteúdo.
import { FontAwesome } from '@expo/vector-icons'; // Biblioteca de ícones FontAwesome.

export default function PrivacyPolicy() {
    return (
        <ScrollView className='bg-[#F4F7F6]'> {/* ScrollView permite rolar o conteúdo, com fundo claro */}
            <View className='flex-1 items-center mt-10 mb-20 p-5'> {/* Contêiner principal com espaçamento */}
                
                {/* Título da Política de Privacidade */}
                <Text
                    style={{ fontFamily: 'poppins-semi-bold' }} // Fonte personalizada
                    className="text-[#87CEEB] mb-5 font-bold text-3xl shadow-sm text-center mt-5 ml-1"
                >
                    Política de Privacidade
                </Text>

                {/* Seção 1 - Informações que Coletamos */}
                <View className='bg-white shadow-lg rounded-xl p-5 w-full mb-5'>
                    <View className='flex-row items-center mb-3'> {/* Título da seção com ícone */}
                        <FontAwesome name="info-circle" size={24} color="#87CEEB" /> {/* Ícone de informação */}
                        <Text
                            style={{ fontFamily: 'poppins-semi-bold' }}
                            className="text-[#87CEEB] text-xl font-bold ml-2"
                        >
                            Informações que Coletamos
                        </Text>
                    </View>
                    {/* Descrição sobre as informações coletadas */}
                    <Text className='text-[#455A64] font-medium text-base'>
                        O AGRO-BOX pode coletar as seguintes informações dos usuários:
                        {"\n\n"}• <Text className='text-[#87CEEB] font-bold'>Informações de Identificação Pessoal</Text>: Nome, endereço de e-mail, e outras informações fornecidas ao se registrar.
                        {"\n\n"}• <Text className='text-[#87CEEB] font-bold'>Informações de Uso</Text>: Dados sobre o uso do app, como páginas visitadas e funcionalidades acessadas.
                        {"\n\n"}• <Text className='text-[#87CEEB] font-bold'>Informações Técnicas</Text>: Tipo de dispositivo, sistema operacional e identificadores únicos.
                    </Text>
                </View>

                {/* Seção 2 - Como Usamos Suas Informações */}
                <View className='bg-white shadow-lg rounded-xl p-5 w-full mb-5'>
                    <View className='flex-row items-center mb-3'> {/* Título da seção com ícone */}
                        <FontAwesome name="cogs" size={24} color="#87CEEB" /> {/* Ícone de configurações */}
                        <Text
                            style={{ fontFamily: 'poppins-semi-bold' }}
                            className="text-[#87CEEB] text-xl font-bold ml-2"
                        >
                            Como Usamos Suas Informações
                        </Text>
                    </View>
                    {/* Descrição sobre como as informações são usadas */}
                    <Text className='text-[#455A64] font-medium text-base'>
                        Utilizamos as informações coletadas para:
                        {"\n\n"}• Melhorar e personalizar a experiência do usuário no app;
                        {"\n\n"}• Gerenciar o acesso às funcionalidades do app;
                        {"\n\n"}• Resolver problemas técnicos e monitorar o desempenho do app.
                    </Text>
                </View>

                {/* Seção 3 - Compartilhamento de Informações */}
                <View className='bg-white shadow-lg rounded-xl p-5 w-full mb-5'>
                    <View className='flex-row items-center mb-3'> {/* Título da seção com ícone */}
                        <FontAwesome name="share-alt" size={24} color="#87CEEB" /> {/* Ícone de compartilhamento */}
                        <Text
                            style={{ fontFamily: 'poppins-semi-bold' }}
                            className="text-[#87CEEB] text-xl font-bold ml-2"
                        >
                            Compartilhamento de Informações
                        </Text>
                    </View>
                    {/* Descrição sobre o compartilhamento de informações */}
                    <Text className='text-[#455A64] font-medium text-base'>
                        Não compartilhamos, vendemos ou alugamos suas informações pessoais, exceto nos seguintes casos:
                        {"\n\n"}• <Text className='text-[#87CEEB] font-bold'>Conformidade Legal</Text>: Compartilhamento para cumprir obrigações legais ou ordens judiciais.
                        {"\n\n"}• <Text className='text-[#87CEEB] font-bold'>Proteção de Direitos</Text>: Divulgação para proteger nossos direitos ou segurança dos usuários.
                        {"\n\n"}• <Text className='text-[#87CEEB] font-bold'>Serviços Terceirizados</Text>: Compartilhamento com provedores de serviços que ajudam na operação do app.
                    </Text>
                </View>

                {/* Seção 4 - Segurança das Informações */}
                <View className='bg-white shadow-lg rounded-xl p-5 w-full mb-5'>
                    <View className='flex-row items-center mb-3'> {/* Título da seção com ícone */}
                        <FontAwesome name="lock" size={24} color="#87CEEB" /> {/* Ícone de segurança */}
                        <Text
                            style={{ fontFamily: 'poppins-semi-bold' }}
                            className="text-[#87CEEB] text-xl font-bold ml-2"
                        >
                            Segurança das Informações
                        </Text>
                    </View>
                    {/* Descrição sobre a segurança das informações e os direitos do usuário */}
                    <Text className='text-[#455A64] font-medium text-base'>
                        Adotamos medidas para proteger suas informações contra acessos não autorizados.
                        {"\n\n"}<Text className='text-[#87CEEB] font-bold'>Seus direitos</Text>:
                        {"\n\n"}• Acessar suas informações pessoais mantidas por nós;
                        {"\n\n"}• Solicitar correções de informações incorretas;
                        {"\n\n"}• Solicitar a exclusão de suas informações pessoais, exceto quando exigido por lei.
                    </Text>
                </View>

                {/* Seção 5 - Alterações na Política */}
                <View className='bg-white shadow-lg rounded-xl p-5 w-full'>
                    <View className='flex-row items-center mb-3'> {/* Título da seção com ícone */}
                        <FontAwesome name="file-text" size={24} color="#87CEEB" /> {/* Ícone de documento */}
                        <Text
                            style={{ fontFamily: 'poppins-semi-bold' }}
                            className="text-[#87CEEB] text-xl font-bold ml-2"
                        >
                            Alterações na Política
                        </Text>
                    </View>
                    {/* Descrição sobre a possibilidade de mudanças na política */}
                    <Text className='text-[#455A64] font-medium text-base'>
                        • Podemos atualizar esta Política de Privacidade periodicamente. 
                        {"\n\n"} • Recomendamos que revise periodicamente esta página para estar ciente de quaisquer alterações.
                    </Text>
                </View>

            </View>
        </ScrollView>
    );
}
