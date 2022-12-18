import { ReactElement, MouseEvent } from "react";
import styled from "styled-components";

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 100%;
  height: 70px;
  padding: 0px 1.5rem 0px 0px;
  border-bottom: 1px solid rgb(207, 217, 224);
  background-color: rgb(247, 249, 250);
  z-index: 10;
  box-sizing: border-box;
`;

const ModalBody = styled.div`
  padding: 5rem;
  overflow-y: auto;
  height: 90%;
`;

const StyledModal = styled.div<NestedStyledProps>`
  position: fixed;
  height: 100%;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  margin-top: 64px;
  background: rgb(255, 255, 255);
  box-shadow: -50em 0 0 rgb(0 0 0 / 20%);
  margin-left: 5%;
  left: ${(props) => props.indexBasedLeft}%;
  &:hover:not(:only-child):not(:last-child) {
    margin-left: 3%;
  }
`;

interface NestedChilProps {
  index: number;
  children?: ReactElement;
  show: boolean;
  handleClose: (index: number, callBack?: () => void) => void;
  handleModalClose: (event: MouseEvent<HTMLDivElement>, index: number) => void;
  nodeRef: any;
  style: any;
  indexBasedLeft: number;
  title: string;
}

interface NestedStyledProps {
  indexBasedLeft: number;
}

const NestedChild = ({
  children,
  index,
  show,
  handleClose,
  handleModalClose,
  nodeRef,
  style,
  indexBasedLeft,
  title,
}: NestedChilProps) => {
  if (!show) {
    return null;
  }

  return (
    <StyledModal
      indexBasedLeft={indexBasedLeft}
      onClick={(event) => {
        handleModalClose(event, index);
      }}
      id="nested_modal"
      ref={nodeRef}
      style={style}
    >
      <ModalHeader>
        <button
          onClick={() => {
            handleClose(index);
          }}
          id="back_button"
        >
          {"<"}
        </button>
        {title}
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
    </StyledModal>
  );
};

export default NestedChild;
