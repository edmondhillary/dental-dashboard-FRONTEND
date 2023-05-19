import React, { createContext, useReducer } from 'react'
import axios from 'axios'
import treatmentReducer from './TreatmentReducer';



export const URL = 'https://dental-dashboard-backend-production.up.railway.app'
const initialState = {
  treatments: [],
  treatment: {},
  isSuccess: false,
  isError: false,
};


export const TreatmentsContext = createContext(initialState);

export const TreatmentsProvider = ({ children }) => {

    const token = JSON.parse(localStorage.getItem('token'))
    const config = {
        headers: {
            Authorization: token
        }
    }


  const [state, dispatch] = useReducer(treatmentReducer, initialState);

  const createTreatment = async (treatment) => {

    try {
      const res = await axios.post(URL + '/tratamientos', treatment, config );
      dispatch({
        type: "POST_TREATMENT",
        payload: res.data
      });
    } catch (error) {
      console.error(error)
      dispatch({
        type: "POST_TREATMENT_ERROR"
      });
    };
  }

  const updateTreatmentById = async (treatment, id) => {
    const res = await axios.put(URL + `/tratamientos/${id}`, treatment, config);
    dispatch({
      type: 'UPDATE_TREATMENT',
      payload: res.data,
    });
    return res;
  }

  const deleteTreatmentById = async (id) => {
    const res = await axios.delete(URL + `/tratamientos/${id}`, config);
    dispatch({
      type: 'DELETE_TREATMENT',
      payload: res.data,
    });
    return res;
  }

  const getTreatmentById = async (id) => {
    const res = await axios.get(URL + `/tratamientos/${id}`, config);
    dispatch({
      type: 'GET_TREATMENT_BY_ID',
      payload: res.data,
    });
  }

  const getTreatmentsByQuery = async (query) => {
    const res = await axios.get(URL + `/tratamientos/budgets/filtros?${query}`, config);
    dispatch({
      type: 'GET_TREATMENTS_BY_QUERY',
      payload: res.data,
    });
    console.log('soy TREATMENT  state',
        res.data
    )
  }

  return (
    <TreatmentsContext.Provider
      value={{
        treatments: state.treatments,
        treatment: state.treatment,
        isSuccess: state.isSuccess,
        isError: state.isError,
        createTreatment,
        updateTreatmentById,
        deleteTreatmentById,
        getTreatmentById,
        getTreatmentsByQuery
      }}
    >
      {children}
    </TreatmentsContext.Provider>
  )
}

