import React, { FC } from 'react'
import {
  addState,
  addProps,
  addEffect,
  addHandlers,
  addStateHandlers,
  flowMax,
} from 'ad-hok'
import { flow } from 'lodash/fp'

interface AddStateInitialStateAsCallbackProps {
  name: string
}

const AddStateInitialStateAsCallback: FC<AddStateInitialStateAsCallbackProps> = flow(
  addState('value', 'setValue', ({ name }) => 'name: ' + name),
  // addState<number>('num', 'setNum'),
  addState('num', 'setNum', undefined as number | undefined),
  addEffect(({ name }) => () => console.log(name), ['name']),
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

const Max: FC = flowMax(addState('num', 'setNum', 0), ({ num }) => (
  <div>num: {num}</div>
))

const App: FC<AppProps> = flow(
  addState('name', 'setName', 'hello'),
  addHandlers(
    {
      upperCaseName: ({ name, setName }) => () => setName(name.toUpperCase()),
      getStringLengthWithName: ({ name }) => (s: string) =>
        s.length + name.length,
      multiParamHandler: () => (a: number, b: string) => a,
    },
    ['name'],
  ),
  addProps(({ name }) => ({ doubledName: `${name} ${name}` }), ['name']),
  addProps({
    amountToIncrementBy: 4,
  }),
  addStateHandlers(
    {
      counter: 0,
      someUnusedState: null as string | null,
    },
    {
      incrementCounter: ({ counter }) => () => ({
        counter: counter + 1,
      }),
      incrementCounterBy: ({ counter }) => (amount: number) => ({
        counter: counter + amount,
      }),
      incrementCounterByProp: ({ counter }, { amountToIncrementBy }) => () => ({
        counter: counter + amountToIncrementBy,
        // abc: 'd', // would be nice if this got flagged as "extra"
        // someUnusedState: 4 // correctly errors
      }),
    },
  ),
  ({
    name,
    setName,
    externalProp,
    doubledName,
    upperCaseName,
    getStringLengthWithName,
    counter,
    incrementCounterByProp,
    incrementCounter,
    incrementCounterBy,
  }) => (
    <div>
      <div>External prop: {externalProp}</div>
      <div>Name: {name}</div>
      <div>Doubled Name: {doubledName}</div>
      <button onClick={() => setName('abc')}>set name</button>
      <button onClick={() => upperCaseName()}>uppercase name</button>
      <div>Length of name + hello: {getStringLengthWithName('hello')}</div>
      <AddStateInitialStateAsCallback name={name} />
      <div>Counter: {counter}</div>
      <button onClick={incrementCounterByProp}>
        increment counter by prop
      </button>
      <button onClick={incrementCounter}>increment counter</button>
      <button onClick={() => incrementCounterBy(2)}>
        increment counter by 2
      </button>
      <Max />
    </div>
  ),
)

export default App
