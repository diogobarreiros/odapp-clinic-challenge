import React from 'react';

import { render, wait } from '@testing-library/react-native';
import AxiosMock from 'axios-mock-adapter';
import api from '../../services/api';

import Dashboard from '../../pages/Dashboard';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

const apiMock = new AxiosMock(api);

describe('Dashboard', () => {
  it('should be able to list the pacientes', async () => {
    const items = [
      {
        id: '1',
        nome: 'Diogo',
        idade: 35,
        cidade: 'Ribeirão Preto',
        estado: 'SP',
      },
      {
        id: '2',
        nome: 'Diogo2',
        idade: 35,
        cidade: 'Ribeirão Preto',
        estado: 'SP',
      },
    ];

    apiMock.onGet('/pacientes').reply(() => {
      return [200, items];
    });

    const { getByText } = render(<Dashboard />);

    await wait(() => expect(getByText('Diogo')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Diogo')).toBeTruthy();
    expect(getByText('Diogo2')).toBeTruthy();
  });
});
