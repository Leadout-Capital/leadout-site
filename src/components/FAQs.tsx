import React, { useState } from 'react'

export const FAQs = ({ faqs }) => {
  return (
    <section className="section">
      <h1 className="faq-title">FAQs</h1>
      <div className="content">
        {faqs.map((faq, i) => (
          <FAQ {...faq} key={i} />
        ))}
      </div>
    </section>
  )
}

const FAQ = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const renderAnswer = () => (
    isOpen && <div className="answer-container" dangerouslySetInnerHTML={{ __html: answer }} />
  )
  return (
    <div className="faq">
      <button onClick={() => setIsOpen(!isOpen)}>
        <div className={`triangle ${isOpen ? 'open' : ''}`} />
        <h2>{question}</h2>
      </button>
      {renderAnswer()}
    </div>
  )
}
