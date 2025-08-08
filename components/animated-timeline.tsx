"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

const timelineEvents = [
  {
    year: "1943",
    title: "Born in Northern Nigeria",
    description: "Nancy Nenne Nadah was born into a loving family"
  },
  {
    year: "1965",
    title: "Completed Education",
    description: "Finished her formal education with distinction"
  },
  {
    year: "1968",
    title: "Marriage",
    description: "Married her beloved husband in a beautiful ceremony"
  },
  {
    year: "1970-1985",
    title: "Motherhood",
    description: "Welcomed and raised her children with love and dedication"
  },
  {
    year: "1990-2010",
    title: "Community Service",
    description: "Devoted years to community service and helping others"
  },
  {
    year: "2000-2020",
    title: "Grandmother",
    description: "Became a loving grandmother, cherishing time with grandchildren"
  },
  {
    year: "2025",
    title: "Eternal Rest",
    description: "Peacefully passed away, leaving behind a legacy of love"
  }
]

export function AnimatedTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<number[]>([])

  return (
    <div ref={containerRef} className="relative">
      {/* Animated connecting line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-600"></div>
      
      <div className="space-y-8">
        {timelineEvents.map((event, index) => (
          <TimelineItem
            key={event.year}
            event={event}
            index={index}
            isVisible={visibleItems.includes(index)}
            onVisible={() => {
              setVisibleItems(prev => [...prev, index])
            }}
          />
        ))}
      </div>
    </div>
  )
}

function TimelineItem({ 
  event, 
  index, 
  isVisible, 
  onVisible 
}: { 
  event: typeof timelineEvents[0]
  index: number
  isVisible: boolean
  onVisible: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { threshold: 0.5, once: true })

  useEffect(() => {
    if (inView && !isVisible) {
      onVisible()
    }
  }, [inView, isVisible, onVisible])

  return (
    <motion.div
      ref={ref}
      className="relative flex items-start space-x-6"
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Animated dot */}
      <motion.div
        className="relative z-10 flex-shrink-0"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
      >
        <div className="w-8 h-8 bg-white border-4 border-blue-500 rounded-full shadow-lg flex items-center justify-center">
          <motion.div
            className="w-3 h-3 bg-blue-500 rounded-full"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
          />
        </div>
        
        {/* Pulse animation for active dot */}
        {inView && (
          <motion.div
            className="absolute inset-0 w-8 h-8 bg-blue-400 rounded-full"
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        className="flex-1 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
      >
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <h4 className="font-bold text-lg text-gray-900 mb-1">{event.year}</h4>
          <h5 className="font-semibold text-gray-800 mb-2">{event.title}</h5>
          <p className="text-gray-600 text-sm">{event.description}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
