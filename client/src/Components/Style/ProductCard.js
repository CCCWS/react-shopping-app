import styled from "styled-components";

export const Card = styled.div`
  min-height: 10rem;
  width: 100%;
  padding: 1rem;
  border-radius: 5px;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
`;

export const Image = styled.img`
  object-fit: contain;
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 1rem;
  white-space: normal;
  margin-bottom: 5px;
`;

export const Price = styled.div`
  color: var(--red);
  font-size: 1.1rem;
  font-weight: 600;
`;

export const Time = styled.div`
  font-size: 0.8rem;
  color: var(--gray);
  font-weight: 500;
`;

export const Count = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--gray);
`;

// export const CountAndPrice = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   align-items: flex-end;

//   min-width: 5rem;
//   font-size: 1rem;
// `;

// export const List = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   width: 100%;
//   margin: auto;
// `;
