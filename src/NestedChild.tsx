import React, { ReactElement, MouseEvent } from 'react'
import { BackIcon } from './BackIcon'
import { ModalProps } from './Modal'

interface NestedChildProps {
  index: number
  children?: ReactElement<ModalProps>
  show: boolean
  handleClose: (index: number, callBack?: () => void) => void
  handleModalClose: (event: MouseEvent<HTMLDivElement>, index: number) => void
  nodeRef: any
  style: any
  indexBasedLeft: number
  title?: string
}

export const NestedChild = ({
  children,
  index,
  show,
  handleClose,
  handleModalClose,
  nodeRef,
  style,
  indexBasedLeft,
  title,
}: NestedChildProps) => {
  if (!show) {
    return null
  }

  return (
    <div
      className='nm_styled-modal'
      onClick={(event: any) => {
        handleModalClose(event, index)
      }}
      id='nested_modal'
      ref={nodeRef}
      style={{ left: `${indexBasedLeft}%`, ...style }}
    >
      <div className='nm_modal-header'>
        <button
          className='nm_back-button'
          onClick={() => {
            handleClose(index)
          }}
          id='nm_back_button'
        >
          <BackIcon />
        </button>
        {title}
      </div>
      <div className='nm_modal-body'>{children}</div>
    </div>
  )
}
