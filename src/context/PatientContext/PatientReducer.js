
const patients = (state, action) => {

  switch (action.type) {
     
      case "EDIT_PATIENT":
        return {
          ...state,
          patient: state.patient
        };
        case 'ADD_PATIENT':
          return {
            ...state,
            patients: [action.payload, ...state.patients],
          };
      case "DELETE_PATIENT":
      return {
        ...state,
        patients: state.patients.filter((patient) => patient._id !== action.payload),
      };
      
      case "GET_PATIENTS":
        return {
        ...state,
          patients: action.payload,
        };
      case "GET_PATIENT_BY_ID":
      return {
       ...state,
        patient: action.payload,
      };
    default:
      return state;
  }
}

export default patients

