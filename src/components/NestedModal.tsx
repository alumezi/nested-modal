import React from 'react'
import { ReactElement, useEffect, useState } from 'react'
import { NestedChild } from '../components/NestedChild'
import { ModalProps } from './ModalChild'

type Props = {
  children: ReactElement<ModalProps> | ReactElement<ModalProps>[]
  currentOpenedModal: string
  setCurrentOpenedModal: (a: string) => void
}

export const NestedModal = ({ children, currentOpenedModal, setCurrentOpenedModal }: Props): any => {
  const [show, setShow] = useState<Map<string, boolean>>(new Map())
  const indexBasedLeft = (index: number) => index * 5

  useEffect(() => {
    const newMap = () => {
      const a = new Map()
      let addedShow = true
      if (Array.isArray(children)) {
        children?.forEach((item) => {
          if (!currentOpenedModal) {
            a.set(item.props.id, false)
            return
          }
          a.set(item.props.id, addedShow)
          if (item.props.id === currentOpenedModal) {
            addedShow = false
          }
        })
      } else {
        a.set(children?.props.id, true)
      }

      return a
    }

    setShow(newMap())
  }, [children, currentOpenedModal])

  useEffect(() => {
    let temp = ''

    if (!show.entries().next().value) {
      temp = ''
    } else {
      show.forEach((value, id) => {
        if (value) {
          temp = id
        }
      })
    }

    const searchParams = new URLSearchParams(window.location.search)

    searchParams.delete('lastNestedModalOpened')

    if (temp) {
      searchParams.append('lastNestedModalOpened', temp)
    }

    const newSearch = searchParams.toString()

    window.history.replaceState({}, '', `${location.pathname}?${newSearch}`)
  }, [show])

  if (!currentOpenedModal) {
    return null
  }

  if (!children) {
    return null
  }

  /**
   * Call all the onClose callbacks on children that will be closed
   * @param children
   * @returns void
   */
  const handleCallbackCalls = async (index: number) => {
    let shouldClose = true
    if (Array.isArray(children)) {
      for (let i = children.length - 1; i >= index; i--) {
        if (children[i] && show.get(children[i].props.id) && children[i].props.onClose) {
          if (!(await children[i]?.props?.onClose?.())) {
            shouldClose = false
          }
        }
      }
    }
    return shouldClose
  }

  const handleClose = async (index: number) => {
    const shouldClose = await handleCallbackCalls(index)

    if (!shouldClose) {
      return
    }

    if (Array.isArray(children)) {
      if (index === 0) {
        setCurrentOpenedModal('')
        return
      }

      setCurrentOpenedModal(children[index - 1]?.props.id)
    } else {
      setCurrentOpenedModal('')
    }
  }

  const handleBaseClick = (event: any) => {
    if (event.target.id === 'nm_nested_base') {
      handleClose(0)
    }
  }

  const handleModalClose = (event: any, index: number) => {
    if (Array.isArray(children)) {
      if (event.target?.id === 'nm_back_button' || event.target?.parentElement.id === 'nm_back_button') {
        handleClose(index)

        return
      }

      const currentOpenedChild = children.findIndex((item) => item.props.id === currentOpenedModal)
      if (currentOpenedChild !== index) {
        handleClose(index + 1)
        return
      }
    }
  }

  if (!Array.isArray(children)) {
    return (
      <div id='nm_nested_base' className='nm_nested-base' onClick={handleBaseClick}>
        <NestedChild
          show={show.get(children?.props.id) || false}
          indexBasedLeft={indexBasedLeft(0)}
          index={0}
          handleModalClose={handleModalClose}
          style={null}
          title={children.props.title}
        >
          {children}
        </NestedChild>
      </div>
    )
  }

  const defaultStyle = (index: number) => ({
    transition: 'margin-left 300ms ease',
    left: `${indexBasedLeft(index) + 4}%`,
  })

  return (
    <div id='nm_nested_base' className='nm_nested-base' onClick={handleBaseClick}>
      {children.map((item, index) => (
        <NestedChild
          index={index}
          key={item.props.id}
          indexBasedLeft={indexBasedLeft(index)}
          title={item.props.title}
          show={show.get(item.props.id) || false}
          handleModalClose={handleModalClose}
          style={{
            ...defaultStyle(index),
          }}
        >
          {item}
        </NestedChild>
      ))}
    </div>
  )
}
