import FlowManager from './components/FunctionManager';

export default function App() {
  return (
    <div className='font-inter'>
      {/* FlowManager is the root component for the assignment */}
      <FlowManager
        blockConfig={[
          { title: 'Function: 1', nextBlock: 1 },
          { title: 'Function: 2', nextBlock: 3 },
          { title: 'Function: 3', nextBlock: -1 },
          { title: 'Function: 4', nextBlock: 4 },
          { title: 'Function: 5', nextBlock: 2 },
        ]}
      />
    </div>
  )
}
