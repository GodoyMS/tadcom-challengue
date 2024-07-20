import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { SERVER_BASE_PATH } from '@/config/configEnv';

interface FetchState<T> {
  loading: boolean;
  success: boolean;
  data?: T;
  error?: string;
}

type ExecuteFunction = (params?: Record<string, any>) => void;

function useFetch<T>(endpoint: string, initialParams: Record<string, any> = {}): [FetchState<T>, ExecuteFunction] {
  const [state, setState] = useState<FetchState<T>>({
    loading: false,
    success: false,
    data: undefined,
    error: undefined,
  });

  const execute: ExecuteFunction = async (params = {}) => {
    setState({ ...state, loading: true });

    try {
      // Merge initialParams with params from function call
      const mergedParams = { ...initialParams, ...params };

      const config: AxiosRequestConfig = {
        url: `${SERVER_BASE_PATH}${endpoint}`,
        method: 'GET',
        params: mergedParams,
      };

      const response = await axios(config);
      setState({
        loading: false,
        success: true,
        data: response.data,
        error: undefined,
      });
    } catch (error: any) {
      setState({
        loading: false,
        success: false,
        data: undefined,
        error: error.message,
      });
    }
  };

  return [state, execute];
}

export default useFetch;
