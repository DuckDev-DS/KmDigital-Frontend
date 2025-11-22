import React from 'react'
import Display from './Display.jsx'
import '../../styles/components/molecules/SectionHeader.css'

function SectionHeader({ title, subtitle }) {
  return (
    <section className="section-header my-4">
      <Display title={title} subtitle={subtitle} />
    </section>
  )
}

export default SectionHeader
