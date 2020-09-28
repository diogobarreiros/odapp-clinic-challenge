import React from 'react';
import { Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  BackgroundImage,
  Title,
  NavigationButton,
  ButtonText,
  IconContainer,
} from './styles';

import Background from '../../assets/home-background.png';
import Logo from '../../assets/logo.png';

const Home: React.FC = () => {
  const navigation = useNavigation();

  async function handleNavigate(): Promise<void> {
    navigation.navigate('MainBottom', {
      screen: 'Dashboard',
    });
  }

  return (
    <BackgroundImage
      source={Background}
      imageStyle={{
        width: 313,
        height: 427,
      }}
    >
      <Container>
        <Image source={Logo} />
        <Title>Encontre aqui os dados dos seus pacientes.</Title>
      </Container>
      <NavigationButton onPress={() => handleNavigate()}>
        <ButtonText>Entrar no ODAPP</ButtonText>
        <IconContainer>
          <Icon name="log-in" size={24} color="#2f4f4f" />
        </IconContainer>
      </NavigationButton>
    </BackgroundImage>
  );
};

export default Home;
