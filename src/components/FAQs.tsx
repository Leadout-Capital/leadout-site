import React from 'react'

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

const FAQ = ({ question, answer }) => (
  <div>
    <h2>{question}</h2>
    <p dangerouslySetInnerHTML={{ __html: answer }} />
  </div>
)
