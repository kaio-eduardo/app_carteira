import { createContext, useReducer, useState } from "react";

export const CarteiraContext = createContext();

const initialState = {
  carteiras: [
    {
      id: 1,
      nome: "João",
      cpf: "111.111.111-11",
      saldo: 500,
      limite: 50,
      tarifa: { month: 1 },
    },
    {
      id: 2,
      nome: "Maria",
      cpf: "222.222.222-22",
      saldo: 1000,
      limite: 100,
      tarifa: { month: 0 },
    },
    {
      id: 3,
      nome: "José",
      cpf: "333.333.333-33",
      saldo: 200,
      limite: 20,
      tarifa: { month: 1 },
    },
  ],
  date: new Date(),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CARTEIRA":
      return { ...state, carteiras: [...state.carteiras, action.payload] };
    case "SET_CARTEIRAS":
      return { ...state, carteiras: action.payload };
    case "WITHDRAW":
      return {
        ...state,
        carteiras: state.carteiras.map((carteira) =>
          carteira.id === action.payload.id
            ? { ...carteira, saldo: (carteira.saldo - action.payload.valor).toFixed(2) }
            : carteira
        ),
      };
    case "DEPOSIT":
      return {
        ...state,
        carteiras: state.carteiras.map((carteira) =>
          carteira.id === action.payload.id
            ? {
                ...carteira,
                saldo:
                  (parseFloat(carteira.saldo) + parseFloat(action.payload.valor)).toFixed(2),
              }
            : carteira
        ),
      };
    case "TRANSFER":
      return {
        ...state,
        carteiras: state.carteiras.map((carteira) =>
          carteira.nome.toLowerCase() === action.payload.name
            ? {
                ...carteira,
                saldo:
                (parseFloat(carteira.saldo) + parseFloat(action.payload.valor)).toFixed(2),
              }
            : carteira
        ),
      };
    case "TARIFA":
      return {
        ...state,
        carteiras: state.carteiras.map((carteira) =>
          carteira.tarifa.month !== action.payload.currentMonth
            ? {
                ...carteira,
                saldo: (carteira.saldo - 19.9).toFixed(2) < 0 ? 0 : (carteira.saldo - 19.9).toFixed(2),
                tarifa: { month: action.payload.currentMonth },
              }
            : carteira
        ),
      };
    case "NEW_DATE":
      return {
        ...state,
        date: action.payload.newDate,
      };
    default:
      return state;
  }
};

const CarteiraProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addCarteira = (carteira) => {
    dispatch({ type: "ADD_CARTEIRA", payload: carteira });
  };

  const setCarteiras = (carteiras) => {
    dispatch({ type: "SET_CARTEIRAS", payload: carteiras });
  };

  const withdraw = (id, valor) => {
    dispatch({ type: "WITHDRAW", payload: { id, valor } });
  };

  const tarifa = () => {
    const currentDate = state.date;
    const currentMonth = currentDate.getMonth() + 1;
    console.log(currentMonth);
    console.log(state.carteiras);
    dispatch({ type: "TARIFA", payload: { currentMonth } });
  };

  const transfer = (name, valor) => {
    dispatch({ type: "TRANSFER", payload: { name, valor } });
  };

  const deposit = (id, valor) => {
    dispatch({ type: "DEPOSIT", payload: { id, valor } });
  };

  const changeDate = (newDate) => {
    dispatch({ type: "NEW_DATE", payload: { newDate } });
  };

  return (
    <CarteiraContext.Provider
      value={{
        carteiras: state.carteiras,
        date: state.date,
        setCarteiras,
        transfer,
        tarifa,
        addCarteira,
        deposit,
        withdraw,
        changeDate
      }}
    >
      {children}
    </CarteiraContext.Provider>
  );
};

export default CarteiraProvider;
