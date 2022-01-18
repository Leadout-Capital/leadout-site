import React, { useState } from 'react'

export const FAQs = ({ faqs }) => {
  return (
    <section>
      <h1>The FAQs</h1>
      {faqs.map((faq, i) => (
        <FAQ {...faq} key={i} />
      ))}
    </section>
  )
}

const FAQ = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        <h2>{question}</h2>
      </button>
      <p dangerouslySetInnerHTML={{ __html: answer }} />
    </div>
  )
}
