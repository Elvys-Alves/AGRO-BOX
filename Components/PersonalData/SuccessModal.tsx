import { View, Text, Modal } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface SuccessModalProps {
    visible: boolean;
    onClose: () => void;
}

const SuccessModal = ({ visible, onClose }: SuccessModalProps) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType='fade'
            onRequestClose={onClose}
        >
            <View className='flex-1 justify-center items-center' >
                <View className="bg-white w-3/4 p-6 rounded-xl items-center shadow-md" >
                    <Text className="text-lg text-[#87CEEB] text-center mb-4" style={{ fontFamily: 'poppins-medium' }}>
                        Alteração salva com sucesso!
                    </Text>
                </View>
            </View>
        </Modal>
    );
}

export default SuccessModal;