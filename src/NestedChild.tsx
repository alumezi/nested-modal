import React, { ReactElement, MouseEvent } from 'react'

interface NestedChildProps {
  index: number
  children?: ReactElement
  show: boolean
  handleClose: (index: number, callBack?: () => void) => void
  handleModalClose: (event: MouseEvent<HTMLDivElement>, index: number) => void
  nodeRef: any
  style: any
  indexBasedLeft: number
  title: string
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
      className='styled-modal'
      onClick={(event: any) => {
        handleModalClose(event, index)
      }}
      id='nested_modal'
      ref={nodeRef}
      style={{ left: `${indexBasedLeft}%`, ...style }}
    >
      <div className='modal-header'>
        <button
          onClick={() => {
            handleClose(index)
          }}
          id='back_button'
        >
          {'<'}
        </button>
        {title}
      </div>
      <div className='modal-body'>{children}</div>
    </div>
  )
}
