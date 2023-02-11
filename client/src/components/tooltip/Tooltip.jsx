import React,{useRef} from 'react'
import './tooltip.css'

const tooltipLiData = [
  {content: 'At least one uppercase character'},
  {content: 'At least one lowercase character'},
  {content: 'At least one digit (0-9)'},
  {content: 'At least one special character (! @ # $ % ^ & *)'},
  {content: 'At least 5 character length'}
]

function detectEdgeTouch(ttRef) {

  const ttBoundary = ttRef?.current?.getBoundingClientRect()

  if (ttBoundary?.right &&  window.innerWidth - ttBoundary.right <= 150) {
    ttRef?.current?.classList.replace('top', 'left')
  }else{
    ttRef?.current?.classList.replace('left', 'top')
  }
}

function debounceDetectEdgeTouch(fn, ref) {
 let timeoutID
 return () => {
  clearTimeout(timeoutID)
  timeoutID = setTimeout(() => {
    fn(ref)
  }, 1000);
 }
}

function Tooltip() {
  const tooltipRef = useRef()
  const renderCount = useRef(0)

  window.addEventListener('load', () => detectEdgeTouch(tooltipRef))
  window.addEventListener('resize', debounceDetectEdgeTouch(detectEdgeTouch, tooltipRef))
 
  const liArray = tooltipLiData.map((li, index) => <li key={index} data-tooltip>{li.content}</li>)

  return (
    <div className='tooltip'>
        <span className='icon' style={{display: 'grid', placeContent: 'center'}}>?</span>
        <div ref={tooltipRef}  className="content top">
          <ul>
          {liArray}
          </ul>
        </div>
   </div>
  )
}

export default Tooltip