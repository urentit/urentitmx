/* Default */
import React, { useRef, useEffect, useState } from 'react'

/* Bee */
import FaIcon from '../../bee/fa-icon'

/* Styles */
import {
  Faq as FaqStyled,
  Question as QuestionStyled,
  Answer as AnswerStyled,
} from './styles'

/**
 * Faqs
 * @param {boolean} open - Faq is open or not - default: false
 * @param {object} children - Children of the component
 * @returns
 */

export const Faqs = ({ children }) => {
  return <>{children}</>
}

/**
 * Faq
 * @param {boolean} open - Faq is open or not - default: false
 * @param {object} children - Children of the component
 * @returns
 */

export const Faq = ({ children, open = false, ...props }) => {
  const [isOpen, setIsOpen] = useState(open)

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  return (
    <FaqStyled  {...props}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { isOpen: isOpen, setIsOpen: setIsOpen })
      )}
    </FaqStyled>
  )
}

/**
 * Question
 * @param {object} children - Children of the component
 * @returns
 */

export const Question = ({ children, isOpen, setIsOpen, ...props }) => (
  <QuestionStyled open={isOpen} onClick={() => setIsOpen(!isOpen)} {...props}>
    {children}
    <FaIcon icon="caret-down" />
  </QuestionStyled>
)

/**
 * Answer
 * @param {object} children - Children of the component
 * @returns
 */

export const Answer = ({ children, isOpen, ...props }) => {
  const answerRef = useRef()
  const [height, setHeight] = useState(0)

  const handleSetHeight = () => {
    if (answerRef.current) {
      setHeight(answerRef.current.scrollHeight)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      handleSetHeight()
    }, 250)
    window.addEventListener('resize', handleSetHeight)
    return () => {
      window.removeEventListener('resize', handleSetHeight)
    }
  }, [])

  return (
    <AnswerStyled open={isOpen} height={height} ref={answerRef} {...props}>
      {children}
    </AnswerStyled>
  )
}
