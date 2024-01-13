import styled, { css } from "styled-components";

export const Section = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  margin: auto;
  padding: 1.5rem;
  font-size: 1rem;

  & > :first-child {
    min-width: 8rem;
    padding: 0.5rem;
    font-weight: 700;

    @media (max-width: 550px) {
      min-width: 100px;
    }
  }
`;

export const Input = styled.input`
  border: 2px solid transparent;
  background-color: ${(props) =>
    props.darkMode ? "var(--black)" : "var(--gray_transparency)"};

  width: ${(props) =>
    //UploadForm Components
    (props.inputType === "title" && "70%") ||
    (props.inputType === "price" && "170px") ||
    (props.inputType === "count" && "100px") ||
    //CheckOut Page
    (props.inputType === "name" && "100px") ||
    (props.inputType === "phone" && "200px") ||
    (props.inputType === "address" && "100%") ||
    (props.inputType === "req" && "100%")};
  height: 3rem;
  /* margin-right: 10px; */
  padding: 0.2rem;
  border-radius: 5px;
  outline: none;

  @media (max-width: 400px) {
    width: ${(props) =>
      //UploadForm Components
      (props.inputType === "title" && "100%") ||
      (props.inputType === "price" && "100%") ||
      (props.inputType === "count" && "100%") ||
      //CheckOut Page
      (props.inputType === "name" && "100%") ||
      (props.inputType === "phone" && "100%")};
  }

  &:focus {
    border: 2px solid var(--red_transparency);
  }

  ${(props) =>
    (props.inputType === "price" || props.inputType === "count") &&
    css`
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    `}
`;

export const Textarea = styled.textarea`
  border: 2px solid transparent;
  background-color: ${(props) =>
    props.darkMode ? "var(--black)" : "var(--gray_transparency)"};
  border-radius: 5px;
  width: 100%;
  height: 10rem;
  padding: 0.5rem;
  outline: none;
  resize: none;
  overflow-y: scroll;

  &:focus {
    border: 2px solid var(--red_transparency);
  }
`;
