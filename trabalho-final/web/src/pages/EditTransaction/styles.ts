import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 736px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-weight: 500;
  font-size: 36px;
  line-height: 54px;
  color: #363f5f;
  text-align: center;
`;

export const ImportFileContainer = styled.section`
  background: #fff;
  margin-top: 40px;
  border-radius: 5px;
  padding: 64px;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  margin: 5px 0;
`;

export const InputLabel = styled.span`
  color: #363f5f;
  font-weight: 500;

  margin-bottom: 4px;
`;

export const Input = styled.input`
  border-radius: 5px;
  border: none;

  background: #f0f2f5;

  padding: 12px 8px;

  color: #666;
`;

export const Select = styled.select`
  border-radius: 5px;

  background: #f0f2f5;

  border: 1px solid #f0f2f5;

  padding: 14px 8px;

  color: #666;
`;

export const Footer = styled.section`
  margin-top: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    display: flex;
    align-items: center;
    font-size: 12px;
    line-height: 18px;
    color: #969cb3;

    img {
      margin-right: 5px;
    }
  }

  button {
    background: #ff872c;
    color: #fff;
    border-radius: 5px;
    padding: 15px 80px;
    border: 0;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#ff872c')};
    }
  }
`;
