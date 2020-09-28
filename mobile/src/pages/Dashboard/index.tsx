import React, { useEffect, useState } from 'react';
import { Image, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/logo-header.png';

import api from '../../services/api';

import {
  Container,
  Header,
  Title,
  PacientesContainer,
  PacienteList,
  Paciente,
  PacienteContent,
  PacienteTitle,
  PacienteDescription,
  PacienteAge,
} from './styles';

interface Paciente {
  id: string;
  nome: string;
  idade: number;
  cidade: string;
  estado: string;
}

const Dashboard: React.FC = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  const [searchValue, setSearchValue] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    async function loadPacientes(): Promise<void> {
      const response = await api.get<Paciente[]>('pacientes');

      setPacientes(response.data);
    }

    loadPacientes();
  }, [searchValue]);

  return (
    <Container>
      <Header>
        <Image source={Logo} />
        <Icon
          name="log-out"
          size={24}
          color="#4682b4"
          onPress={() => navigation.navigate('Home')}
        />
      </Header>
      <ScrollView>
        <PacientesContainer>
          <Title>Pacientes</Title>
          <PacienteList>
            {pacientes.map(paciente => (
              <Paciente
                key={paciente.id}
                activeOpacity={0.6}
                testID={`paciente-${paciente.id}`}
              >
                <PacienteContent>
                  <PacienteTitle>{paciente.nome}</PacienteTitle>
                  <PacienteDescription>
                    {paciente.cidade} - {paciente.estado}
                  </PacienteDescription>
                  <PacienteAge>{paciente.idade} anos</PacienteAge>
                </PacienteContent>
              </Paciente>
            ))}
          </PacienteList>
        </PacientesContainer>
      </ScrollView>
    </Container>
  );
};

export default Dashboard;
