import {motion} from 'framer-motion'
import {useState} from 'react'


function Item({ header, content }: { header: string; content: string }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <motion.div
      layout
      onClick={() => setIsOpen(!isOpen)}
    >
      <motion.h2 layout>{header}</motion.h2>
      {isOpen ? content : null}
    </motion.div>
  )
}

export default Item;