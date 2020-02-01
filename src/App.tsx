import React, { FC } from 'react'
import { addState, addProps } from 'ad-hok'
import { flow } from 'lodash/fp'

interface AddStateInitialStateAsCallbackProps {
  name: string
}

const AddStateInitialStateAsCallback: FC<AddStateInitialStateAsCallbackProps> = flow(
  addState('value', 'setValue', ({ name }) => 'name: ' + name),
  // addState<number>('num', 'setNum'),
  addState('num', 'setNum', undefined as number | undefined),
  ({ name, value, num, setNum }) => (
    <div>
      <div>name: {name}</div>
      <div>value: {value}</div>
      <div>num: {num}</div>
      <button
        onClick={() =>
          setNum(
            // 'a' // correctly disallowed
            3,
          )
        }
      >
        set num
      </button>
    </div>
  ),
)

interface AppProps {
  externalProp: string
}

const App: FC<AppProps> = flow(
  addState('name', 'setName', 'hello'),
  addProps(({ name }) => ({ doubledName: `${name} ${name}` }), ['name']),
  ({ name, setName, externalProp, doubledName }) => (
    <div>
      <div>External prop: {externalProp}</div>
      <div>Name: {name}</div>
      <div>Doubled Name: {doubledName}</div>
      <button onClick={() => setName('abc')}>set name</button>
      <AddStateInitialStateAsCallback name={name} />
    </div>
  ),
)

export default App
