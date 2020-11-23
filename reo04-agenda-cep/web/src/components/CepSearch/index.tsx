import React, {
  ChangeEvent,
  useCallback,
  useState,
  InputHTMLAttributes,
} from "react";
import { FiSearch } from "react-icons/fi";
import ReactInputMask from "react-input-mask";
import cepAPI from "../../api/CepApi";
import { Container } from "./styles";

interface ICepAttributes {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
}

interface ICepSearchProps extends InputHTMLAttributes<HTMLInputElement> {
  handleCepIsFound: (data: ICepAttributes) => void;
}

export const CepSearchInput: React.FC<ICepSearchProps> = ({
  name,
  handleCepIsFound,
  defaultValue,
  ...rest
}) => {
  const [cepInputText, setCepInputText] = useState<string>(
    defaultValue ? (defaultValue as string) : ""
  );

  const handleCepChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) =>
      setCepInputText(event.target.value),
    []
  );

  const handleSearchCPF = useCallback(
    async (event: any) => {
      event.preventDefault();

      const response = await cepAPI.search(cepInputText.replace("-", ""));

      if (response) {
        handleCepIsFound(response);
      }
    },
    [cepInputText, handleCepIsFound]
  );
  return (
    <Container>
      CEP
      <div className="cep-search">
        <ReactInputMask
          mask="99999-999"
          alwaysShowMask
          name={name}
          value={cepInputText}
          onChange={handleCepChange}
          {...rest}
        />
        <button onClick={handleSearchCPF}>
          <FiSearch size={16} />
        </button>
      </div>
    </Container>
  );
};

export default CepSearchInput;
