import React, { ReactElement, FC } from 'react'

export interface ModalProps {
  id: string
  children: ReactElement | ReactElement[] | string
  title?: string
  onClose?: () => Promise<boolean>
}

export const Modal: FC<ModalProps> = ({ id, children }) => {
  return (
    <div id={id} className='nm_modal_instance'>
      {children}
    </div>
  )
}
