import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';

interface SubmitButtonProps extends TouchableOpacityProps{
    isLoading: boolean;
    comment: string;
}

export function SubmitButton({ isLoading, comment, ...rest }: SubmitButtonProps) {
  return (
    <TouchableOpacity style={comment.length===0 || isLoading?styles.containerDisabled : styles.container} {...rest} disabled={comment.length===0 || isLoading}>
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