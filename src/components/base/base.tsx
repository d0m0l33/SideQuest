import styled from "styled-components";
import { BorderRad, Colors, Shadows, Sizes, Transitions } from "../../global/styles";

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${Sizes.headerHeight};
  height: 100%;
  min-height: 100vh;
  background-color: ghostwhite;
`


export const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: rgb(223 232 241);;
  border-radius: ${BorderRad.s};
  box-shadow: ${Shadows.main};
  padding: 10px;
`

export const Link = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  text-decoration: underline;
  color: ${Colors.Gray['600']};
  cursor: pointer;
  transition: ${Transitions.all};

  &:hover,
  &:focus-within {
    color: ${Colors.Yellow[500]};
  }
`