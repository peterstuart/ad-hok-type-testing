import React, { FC, createContext, ComponentType } from 'react'
import {
  addState,
  addProps,
  addEffect,
  addHandlers,
  addStateHandlers,
  flowMax,
  addWrapper,
  // addWrapperPositionalArgs,
  addPropTypes,
  addRef,
  branch,
  returns,
  renderNothing,
  addContext,
  addWrapperHOC,
  PropAddingHOCType,
} from 'ad-hok'
import { flow } from 'lodash/fp'
import { constant } from 'lodash'
import PropTypes from 'prop-types'

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

// interface PropAddingAddWrapperOptions<TProps> {
//   render: (additionalProps: { val: string }) => any
//   props: TProps
// }

const Branch: FC = flowMax(
  addProps({
    num: 3,
  }),
  branch(
    ({ num }) => num > 2,
    addProps({ passed: true }),
    addProps({
      passed: 3,
      // xyz: 'abc'
    }),
  ),
  branch(constant(true), renderNothing()),
  branch(
    ({ num }) => num < 4,
    returns(({ num }) => <div>branched returns: {num}</div>),
  ),
  ({
    num,
    passed,
    // xyz
  }) => (
    <div>
      branch: {num} {passed}
    </div>
  ),
)

const FooContext = createContext({
  bar: 'bar',
})

const withX = <TProps extends {}>(Component: ComponentType<TProps>) => (
  props: TProps,
) => <Component {...props} x={4} />

const Max: FC = flowMax(
  addState('num', 'setNum', 0),
  addPropTypes({
    num: PropTypes.number.isRequired,
    setNum: PropTypes.func.isRequired,
  }),
  // addWrapper(({ render, props: { setNum } }: PropAddingAddWrapperOptions) => (
  // addWrapperPositionalArgs((render: (additionalProps: { val: string }) => any, { setNum }) => (
  addWrapper(({ render, props: { setNum } }) => (
    <FooContext.Provider value={{ bar: 'barVal' }}>
      <div>
        <button onClick={() => setNum(5)}>set num</button>
        {// render({ val: 'val' })
        render()}
      </div>
    </FooContext.Provider>
  )),
  addContext(FooContext, 'foo'),
  addWrapperHOC(withX as PropAddingHOCType<{ x: number }>),
  ({
    num,
    // val,
    foo: { bar },
    x,
  }) => (
    <>
      <div>num: {num}</div>
      {/*<div>val: {val}</div>*/}
      <div>bar: {bar}</div>
      <div>x: {x}</div>
    </>
  ),
)

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
  addRef('containerRef', null as HTMLDivElement | null),
  addEffect(({ containerRef }) => () => {
    console.log(containerRef.current?.clientLeft)
  }),
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
    containerRef,
    counter,
    incrementCounterByProp,
    incrementCounter,
    incrementCounterBy,
  }) => (
    <div ref={containerRef}>
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
      <Branch />
    </div>
  ),
)

export default App
