import React from 'react';

import { render, fireEvent, act, wait } from '@testing-library/react';
import AxiosMock from 'axios-mock-adapter';
import api from '../../services/api';

import Dashboard from '../../pages/Dashboard';

const apiMock = new AxiosMock(api);

describe('Dashboard', () => {
  it('should be able to list all the paciente from your api', async () => {
    apiMock.onGet('pacientes').reply(200, [
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
      {
        id: '3',
        nome: 'Diogo3',
        idade: 35,
        cidade: 'Ribeirão Preto',
        estado: 'SP',
      },
    ]);

    const { getByText, getByTestId } = render(<Dashboard />);

    await wait(() => expect(getByText('Diogo')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Diogo')).toBeTruthy();
    expect(getByTestId('remove-paciente-Diogo')).toBeTruthy();
    expect(getByTestId('edit-paciente-Diogo')).toBeTruthy();

    expect(getByText('Diogo2')).toBeTruthy();
    expect(getByTestId('remove-paciente-Diogo2')).toBeTruthy();
    expect(getByTestId('edit-paciente-Diogo2')).toBeTruthy();

    expect(getByText('Diogo3')).toBeTruthy();
    expect(getByTestId('remove-paciente-Diogo3')).toBeTruthy();
    expect(getByTestId('edit-paciente-Diogo3')).toBeTruthy();
  });

  it('should be able to add a new paciente', async () => {
    apiMock.onGet('pacientes').reply(200, []);

    const { getByText, getByTestId, getByPlaceholderText } = render(
      <Dashboard />,
    );

    act(() => {
      fireEvent.click(getByText('Novo Paciente'));
    });

    const inputNome = getByPlaceholderText('Insira seu nome');
    const inputCidade = getByPlaceholderText('Insira a sua cidade');
    const inputEstado = getByPlaceholderText('Insira seu estado');
    const inputIdade = getByPlaceholderText('Insira a sua idade');

    await act(async () => {
      fireEvent.change(inputNome, { target: { value: 'Diogo' } });
      fireEvent.change(inputCidade, { target: { value: 'Ribeirão Preto' } });
      fireEvent.change(inputEstado, { target: { value: 'SP' } });
      fireEvent.change(inputIdade, { target: { value: '35' } });
    });

    expect(inputNome.value).toBe('Diogo');
    expect(inputCidade.value).toBe('Ribeirão Preto');
    expect(inputEstado.value).toBe('SP');
    expect(inputIdade.value).toBe('35');

    apiMock.onPost('paciente').reply(200, {
      id: '5f70d855dc5bb9244c3ba746',
      nome: 'Diogo',
      idade: 35,
      cidade: 'Ribeirão Preto',
      estado: 'SP',
    });

    await act(async () => {
      fireEvent.click(getByTestId('add-paciente-button'));
    });

    await wait(() => expect(getByText('Diogo')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Diogo')).toBeTruthy();
    expect(getByTestId('remove-paciente-Diogo')).toBeTruthy();
    expect(getByTestId('edit-paciente-Diogo')).toBeTruthy();
  });

  it('should be able to edit a paciente', async () => {
    apiMock.onGet('pacientes').reply(200, [
      {
        id: '5f70d855dc5bb9244c3ba746',
        nome: 'Diogo',
        idade: 35,
        cidade: 'Ribeirão Preto',
        estado: 'SP',
      },
    ]);

    const { getByText, getByTestId, getByPlaceholderText } = render(
      <Dashboard />,
    );

    await wait(() => expect(getByText('Diogo')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Diogo')).toBeTruthy();
    expect(getByTestId('remove-paciente-Diogo')).toBeTruthy();
    expect(getByTestId('edit-paciente-Diogo')).toBeTruthy();

    act(() => {
      fireEvent.click(getByTestId('edit-paciente-Diogo'));
    });

    const inputNome = getByPlaceholderText('Insira seu nome');
    const inputCidade = getByPlaceholderText('Insira a sua cidade');
    const inputEstado = getByPlaceholderText('Insira seu estado');
    const inputIdade = getByPlaceholderText('Insira a sua idade');

    await act(async () => {
      fireEvent.change(inputNome, { target: { value: 'Diogo' } });
      fireEvent.change(inputCidade, { target: { value: 'Ribeirão Preto' } });
      fireEvent.change(inputEstado, { target: { value: 'SP' } });
      fireEvent.change(inputIdade, { target: { value: '35' } });
    });

    expect(inputNome.value).toBe('Diogo');
    expect(inputCidade.value).toBe('Ribeirão Preto');
    expect(inputEstado.value).toBe('SP');
    expect(inputIdade.value).toBe('35');

    apiMock.onPut('paciente/5f70d855dc5bb9244c3ba746').reply(200, {
      nome: 'Diogo',
      idade: 35,
      cidade: 'Ribeirão Preto',
      estado: 'SP',
    });

    await act(async () => {
      fireEvent.click(getByTestId('edit-paciente-button'));
    });

    await wait(() => expect(getByText('Diogo')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Diogo')).toBeTruthy();
    expect(getByTestId('remove-paciente-Diogo')).toBeTruthy();
    expect(getByTestId('edit-paciente-Diogo')).toBeTruthy();
  });

  it('should be able to remove a paciente', async () => {
    apiMock.onGet('pacientes').reply(200, [
      {
        id: '5f70d855dc5bb9244c3ba746',
        nome: 'Diogo',
        idade: 35,
        cidade: 'Ribeirão Preto',
        estado: 'SP',
      },
    ]);

    apiMock.onDelete('paciente/5f70d855dc5bb9244c3ba746').reply(204);

    const { getByText, getByTestId } = render(<Dashboard />);

    await wait(() => expect(getByText('Diogo')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Diogo')).toBeTruthy();
    expect(getByTestId('remove-paciente-Diogo')).toBeTruthy();
    expect(getByTestId('edit-paciente-Diogo')).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByTestId('remove-paciente-Diogo'));
    });

    expect(getByTestId('pacientes-list')).toBeEmpty();
  });
});
