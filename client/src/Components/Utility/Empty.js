import styled from "styled-components";

const Empty = ({ children }) => {
  return <Div>{children}</Div>;
};

const Div = styled.div`
  position: fixed;
  top: 0;
  width: inherit;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1.5rem;
`;

export default Empty;
