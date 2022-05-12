import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';

interface SubmitButtonProps extends TouchableOpacityProps{
    isLoading: boolean;
}

export function SubmitButton({ isLoading, ...rest }: SubmitButtonProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
        {isLoading
         ?
         <ActivityIndicator 
            color={theme.colors.text_on_brand_color}
         />
         : <Text style={styles.title}>Enviar Feedback</Text>
         }
    </TouchableOpacity>
  );
}