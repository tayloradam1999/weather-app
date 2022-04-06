import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import {
  WeatherAction,
  WeatherData,
  WeatherError,
  GET_WEATHER,
  SET_LOADING,
  SET_ERROR
} from '../types';

export const getWeather = (city: string): ThunkAction<void, RootState, null, WeatherAction> => {
  return async dispatch => {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f853df99b59dbca50492274a17779088`);

      if (!res.ok) {
        const resData: WeatherError = await res.json();
        throw new Error(resData.message);
      }

      const resData: WeatherData = await res.json();
      dispatch({
        type: GET_WEATHER,
        payload: resData
      });
    } catch (err) {
      let errorMessage = 'Something went wrong';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      dispatch({
        type: SET_ERROR,
        payload: errorMessage
      });
    }
  }
};

export const setLoading = (): WeatherAction => {
  return {
    type: SET_LOADING
  };
}

export const setError = (msg: string): WeatherAction => {
  return {
    type: SET_ERROR,
    payload: msg
  };
}

