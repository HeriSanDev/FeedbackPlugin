import React, {useState} from 'react';
import { 
    View,
    TextInput,
    Text,
    TouchableOpacity,
    Image,
 } from 'react-native';

import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system'

import { theme } from '../../theme';
import { styles } from './styles';
import { ArrowLeft } from 'phosphor-react-native';

import {FeedbackType} from '../../components/Widget';
import {ScreenshotButton} from '../../components/ScreenshotButton';
import {SubmitButton} from '../../components/SubmitButton';

import { feedbackTypes } from '../../utils/feedbackTypes'
import { api } from '../../libs/api';

interface FormProps {
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void;
    onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: FormProps) {
    const [comment, setComment] = useState('');
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const feedbackTypeInfo = feedbackTypes[feedbackType];

    const handleScreenshot = () =>{
        captureScreen({
            format: 'png',
            quality: 0.8
        })
        .then(uri => setScreenshot(uri))
        .catch(error => console.log(error));
    }
    const handleScreenshotRemove = () =>{
        setScreenshot(null);
    }
    const handleSendFeedback = async () =>{
        if(!comment) return;
        if(isSendingFeedback){
            return;
        }
        setIsSendingFeedback(true);
        const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, {encoding: 'base64'})
        try{
            await api.post('/feedbacks',{
                type: feedbackType,
                screenshot: `data:image/png;base64,${screenshotBase64}`,
                comment
               

            });

            console.log(screenshot);

            onFeedbackSent();
        } catch(error){
            console.log(error);
        }
        setIsSendingFeedback(false);
    }
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={onFeedbackCanceled}>
                <ArrowLeft 
                    size={24}
                    weight="bold"
                    color={theme.colors.text_secondary}
                />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Image
                    source={feedbackTypeInfo.image}
                    style={styles.image}
                 />
                <Text style={styles.titleText}>
                    {feedbackTypeInfo.title}
                </Text>
            </View>
        </View>
        <TextInput
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo?"
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
        />
        <View style={styles.footer}>
            <ScreenshotButton
                onTakeShot={handleScreenshot}
                onRemoveShot={handleScreenshotRemove}
                screenshot={screenshot}
            />
            <SubmitButton isLoading={isSendingFeedback} onPress={handleSendFeedback} comment={comment} />
        </View>
    </View>
  );
}