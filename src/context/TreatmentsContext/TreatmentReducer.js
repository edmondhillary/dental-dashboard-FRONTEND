const treatmentReducer = (state, action) => {

    switch (action.type) {
      case "POST_TREATMENT":
        return {
          ...state,
          treatments: [...state.treatments, action.payload],
          isSuccess: true,
        };
      case "POST_TREATMENT_ERROR":
        return {
          ...state,
          isError: true,
        };
      case "UPDATE_TREATMENT":
        return {
          ...state,
          treatments: state.treatments.map(treatment => treatment._id === action.payload._id ? action.payload : treatment)
        };
      case "DELETE_TREATMENT":
        return {
          ...state,
          treatments: state.treatments.filter(treatment => treatment._id !== action.payload._id)
        };
      case "GET_TREATMENT_BY_ID":
        return {
          ...state,
          treatment: action.payload,
        };
      case "GET_TREATMENTS_BY_QUERY":
        return {
          ...state,
          treatments: action.payload,
        };
      default:
        return state;
    }
  }
  
  export default treatmentReducer