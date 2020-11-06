import React, { createContext, useCallback, useContext, useState } from "react";

import { v4 as uuid } from "uuid";
import { STATIC_CARS } from "./static";

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  imageUrl: string;
}

interface CarContextData {
  cars: Car[];

  find(id: string): Car | undefined;
  add(carInfo: Omit<Car, "id">): void;
  remove(id: string): void;
  update(id: string, newData: Omit<Car, "id">): void;
}

const CarContext = createContext<CarContextData>({} as CarContextData);

export const CarProvider: React.FC = ({ children }) => {
  const [cars, setCars] = useState<Car[]>(STATIC_CARS);

  const find = useCallback(
    (id: string) => {
      return cars.find((car) => car.id === id);
    },
    [cars]
  );

  const add = useCallback(
    ({ year, brand, imageUrl, model }: Omit<Car, "id">) => {
      const newCar: Car = {
        id: uuid(),
        year,
        brand,
        imageUrl,
        model,
      };

      setCars([...cars, newCar]);
    },
    [cars]
  );

  const remove = useCallback((id: string) => {
    setCars((carsState) => carsState.filter((car) => car.id !== id));
  }, []);

  const update = useCallback((id: string, newData: Omit<Car, "id">) => {
    setCars((oldState) => {
      return oldState.map((car) => {
        if (car.id === id) {
          return {
            id,
            ...newData,
          };
        }

        return car;
      });
    });
  }, []);

  return (
    <CarContext.Provider value={{ cars, find, add, remove, update }}>
      {children}
    </CarContext.Provider>
  );
};

export function useCarsContext(): CarContextData {
  const context = useContext(CarContext);

  if (!context) {
    throw new Error(
      "useCarsContext precisa ser utilizado dentro de seu CarProvider"
    );
  }

  return context;
}
