import React, { useState } from 'react'

export const FAQs = ({ faqs }) => {
  return (
    <section className="section">
      <h1>FAQs</h1>
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
  return (
    <div className="faq">
      <button onClick={() => setIsOpen(!isOpen)}>
        <h2>{question}</h2>
      </button>
      <p dangerouslySetInnerHTML={{ __html: answer }} className={isOpen ? '' : 'hide'} />
    </div>
  )
}
