import styled from 'styled-components';
import {color, colorAdjust, components, cursor, font, layout, length} from "../../Styles/sharedStyles";

export const Resources = styled.div`
  
`;

export const SubmitResourceButton = styled.div`
  ${components.button};
  width: fit-content;
  font-size: 18px;
  margin-right: ${length.margin};
`;

export const FilterButton = styled.div`
  ${components.button};
  
  width: fit-content;
  font-size: 18px;
  margin-left: auto;
`;

export const ResourcePageHead = styled.div`
  ${layout.row};
    margin: ${length.margin};

`;

