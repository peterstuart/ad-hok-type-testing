declare module 'ad-hok' {
  import { flow } from 'lodash/fp'
  import { ReactElement, MutableRefObject } from 'react'
  import { ValidationMap } from 'prop-types'

  type AddStateType = <
    TState,
    TStateName extends string,
    TStateUpdaterName extends string,
    TProps
  >(
    stateName: TStateName,
    stateUpdaterName: TStateUpdaterName,
    initialState: TState | ((props: TProps) => TState),
  ) => (
    props: TProps,
  ) => TProps &
    { [stateName in TStateName]: TState } &
    { [stateUpdaterName in TStateUpdaterName]: (state: TState) => void }

  declare const addState: AddStateType

  type AddEffectType = <TProps>(
    callback: (props: TProps) => () => void,
    dependencies?: Array<string>,
  ) => (props: TProps) => TProps

  declare const addEffect: AddEffectType

  declare const addLayoutEffect: AddEffectType

  type AddPropsType = <TProps, AdditionalProps extends { [key: string]: any }>(
    createProps: ((props: TProps) => AdditionalProps) | AdditionalProps,
    dependencies?: Array<string>,
  ) => (props: TProps) => TProps & AdditionalProps

  declare const addProps: AddPropsType

  type AddRefType = <TRefName extends string, TRef, TProps>(
    refName: TRefName,
    initialValue: TRef,
  ) => (
    props: TProps,
  ) => TProps & { [refName in TRefName]: MutableRefObject<TRef> }

  declare const addRef: AddRefType

  interface HandlerCreators<TProps> {
    [key: string]: (props: TProps) => (...args: any[]) => any
  }

  type AddHandlersType = <Creators extends HandlerCreators<TProps>, TProps>(
    handlerCreators: Creators,
    dependencies?: Array<string>,
  ) => (
    props: TProps,
  ) => TProps & { [K in keyof Creators]: ReturnType<Creators[K]> }

  declare const addHandlers: AddHandlersType

  interface StateUpdaters<TProps, TState> {
    [key: string]: (
      state: TState,
      props: TProps,
    ) => (...args: any[]) => Partial<TState>
  }

  type AddStateHandlersType = <
    Updaters extends StateUpdaters<TProps, TState>,
    TProps,
    TState
  >(
    initialState: ((props: TProps) => TState) | TState,
    stateUpdaters: Updaters,
    dependencies?: Array<string>,
  ) => (
    props: TProps,
  ) => TProps & TState & { [K in keyof Updaters]: ReturnType<Updaters[K]> }

  declare const addStateHandlers: AddStateHandlersType

  type Many<T> = T | ReadonlyArray<T>

  interface LodashFlow {
    <R1, R2>(f1: () => R1, f2: (a: R1) => R2): () => R2
    <R1, R2, R3>(f1: () => R1, f2: (a: R1) => R2, f3: (a: R2) => R3): () => R3
    <R1, R2, R3, R4>(
      f1: () => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
    ): () => R4
    <R1, R2, R3, R4, R5>(
      f1: () => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
      f5: (a: R4) => R5,
    ): () => R5
    <R1, R2, R3, R4, R5, R6>(
      f1: () => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
      f5: (a: R4) => R5,
      f6: (a: R5) => R6,
    ): () => R6
    <R1, R2, R3, R4, R5, R6, R7>(
      f1: () => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
      f5: (a: R4) => R5,
      f6: (a: R5) => R6,
      f7: (a: R6) => R7,
    ): () => R7
    <R1, R2, R3, R4, R5, R6, R7>(
      f1: () => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
      f5: (a: R4) => R5,
      f6: (a: R5) => R6,
      f7: (a: R6) => R7,
      ...funcs: Array<Many<(a: any) => any>>
    ): () => any
    <A1, R1, R2>(f1: (a1: A1) => R1, f2: (a: R1) => R2): (a1: A1) => R2
    <A1, R1, R2, R3>(
      f1: (a1: A1) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
    ): (a1: A1) => R3
    <A1, R1, R2, R3, R4>(
      f1: (a1: A1) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
    ): (a1: A1) => R4
    <A1, R1, R2, R3, R4, R5>(
      f1: (a1: A1) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
      f5: (a: R4) => R5,
    ): (a1: A1) => R5
    <A1, R1, R2, R3, R4, R5, R6>(
      f1: (a1: A1) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
      f5: (a: R4) => R5,
      f6: (a: R5) => R6,
    ): (a1: A1) => R6
    <A1, R1, R2, R3, R4, R5, R6, R7>(
      f1: (a1: A1) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
      f5: (a: R4) => R5,
      f6: (a: R5) => R6,
      f7: (a: R6) => R7,
    ): (a1: A1) => R7
    <A1, R1, R2, R3, R4, R5, R6, R7>(
      f1: (a1: A1) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
      f5: (a: R4) => R5,
      f6: (a: R5) => R6,
      f7: (a: R6) => R7,
      ...funcs: Array<Many<(a: any) => any>>
    ): (a1: A1) => any
    <A1, A2, R1, R2>(f1: (a1: A1, a2: A2) => R1, f2: (a: R1) => R2): (
      a1: A1,
      a2: A2,
    ) => R2
    <A1, A2, R1, R2, R3>(
      f1: (a1: A1, a2: A2) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
    ): (a1: A1, a2: A2) => R3
    <A1, A2, R1, R2, R3, R4>(
      f1: (a1: A1, a2: A2) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
    ): (a1: A1, a2: A2) => R4
    <A1, A2, R1, R2, R3, R4, R5>(
      f1: (a1: A1, a2: A2) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
      f5: (a: R4) => R5,
    ): (a1: A1, a2: A2) => R5
    <A1, A2, R1, R2, R3, R4, R5, R6>(
      f1: (a1: A1, a2: A2) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
      f5: (a: R4) => R5,
      f6: (a: R5) => R6,
    ): (a1: A1, a2: A2) => R6
    <A1, A2, R1, R2, R3, R4, R5, R6, R7>(
      f1: (a1: A1, a2: A2) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
      f5: (a: R4) => R5,
      f6: (a: R5) => R6,
      f7: (a: R6) => R7,
    ): (a1: A1, a2: A2) => R7
    <A1, A2, R1, R2, R3, R4, R5, R6, R7>(
      f1: (a1: A1, a2: A2) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
      f5: (a: R4) => R5,
      f6: (a: R5) => R6,
      f7: (a: R6) => R7,
      ...funcs: Array<Many<(a: any) => any>>
    ): (a1: A1, a2: A2) => any
    <A1, A2, A3, R1, R2>(
      f1: (a1: A1, a2: A2, a3: A3) => R1,
      f2: (a: R1) => R2,
    ): (a1: A1, a2: A2, a3: A3) => R2
    <A1, A2, A3, R1, R2, R3>(
      f1: (a1: A1, a2: A2, a3: A3) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
    ): (a1: A1, a2: A2, a3: A3) => R3
    <A1, A2, A3, R1, R2, R3, R4>(
      f1: (a1: A1, a2: A2, a3: A3) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
    ): (a1: A1, a2: A2, a3: A3) => R4
    <A1, A2, A3, R1, R2, R3, R4, R5>(
      f1: (a1: A1, a2: A2, a3: A3) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
      f5: (a: R4) => R5,
    ): (a1: A1, a2: A2, a3: A3) => R5
    <A1, A2, A3, R1, R2, R3, R4, R5, R6>(
      f1: (a1: A1, a2: A2, a3: A3) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
      f5: (a: R4) => R5,
      f6: (a: R5) => R6,
    ): (a1: A1, a2: A2, a3: A3) => R6
    <A1, A2, A3, R1, R2, R3, R4, R5, R6, R7>(
      f1: (a1: A1, a2: A2, a3: A3) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
      f5: (a: R4) => R5,
      f6: (a: R5) => R6,
      f7: (a: R6) => R7,
    ): (a1: A1, a2: A2, a3: A3) => R7
    <A1, A2, A3, R1, R2, R3, R4, R5, R6, R7>(
      f1: (a1: A1, a2: A2, a3: A3) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
      f5: (a: R4) => R5,
      f6: (a: R5) => R6,
      f7: (a: R6) => R7,
      ...funcs: Array<Many<(a: any) => any>>
    ): (a1: A1, a2: A2, a3: A3) => any
    <A1, A2, A3, A4, R1, R2>(
      f1: (a1: A1, a2: A2, a3: A3, a4: A4) => R1,
      f2: (a: R1) => R2,
    ): (a1: A1, a2: A2, a3: A3, a4: A4) => R2
    <A1, A2, A3, A4, R1, R2, R3>(
      f1: (a1: A1, a2: A2, a3: A3, a4: A4) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
    ): (a1: A1, a2: A2, a3: A3, a4: A4) => R3
    <A1, A2, A3, A4, R1, R2, R3, R4>(
      f1: (a1: A1, a2: A2, a3: A3, a4: A4) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
    ): (a1: A1, a2: A2, a3: A3, a4: A4) => R4
    <A1, A2, A3, A4, R1, R2, R3, R4, R5>(
      f1: (a1: A1, a2: A2, a3: A3, a4: A4) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
      f5: (a: R4) => R5,
    ): (a1: A1, a2: A2, a3: A3, a4: A4) => R5
    <A1, A2, A3, A4, R1, R2, R3, R4, R5, R6>(
      f1: (a1: A1, a2: A2, a3: A3, a4: A4) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
      f5: (a: R4) => R5,
      f6: (a: R5) => R6,
    ): (a1: A1, a2: A2, a3: A3, a4: A4) => R6
    <A1, A2, A3, A4, R1, R2, R3, R4, R5, R6, R7>(
      f1: (a1: A1, a2: A2, a3: A3, a4: A4) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
      f5: (a: R4) => R5,
      f6: (a: R5) => R6,
      f7: (a: R6) => R7,
    ): (a1: A1, a2: A2, a3: A3, a4: A4) => R7
    <A1, A2, A3, A4, R1, R2, R3, R4, R5, R6, R7>(
      f1: (a1: A1, a2: A2, a3: A3, a4: A4) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
      f5: (a: R4) => R5,
      f6: (a: R5) => R6,
      f7: (a: R6) => R7,
      ...funcs: Array<Many<(a: any) => any>>
    ): (a1: A1, a2: A2, a3: A3, a4: A4) => any
    <A1, A2, A3, A4, R1, R2>(
      f1: (a1: A1, a2: A2, a3: A3, a4: A4, ...args: any[]) => R1,
      f2: (a: R1) => R2,
    ): (a1: A1, a2: A2, a3: A3, a4: A4, ...args: any[]) => R2
    <A1, A2, A3, A4, R1, R2, R3>(
      f1: (a1: A1, a2: A2, a3: A3, a4: A4, ...args: any[]) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
    ): (a1: A1, a2: A2, a3: A3, a4: A4, ...args: any[]) => R3
    <A1, A2, A3, A4, R1, R2, R3, R4>(
      f1: (a1: A1, a2: A2, a3: A3, a4: A4, ...args: any[]) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
    ): (a1: A1, a2: A2, a3: A3, a4: A4, ...args: any[]) => R4
    <A1, A2, A3, A4, R1, R2, R3, R4, R5>(
      f1: (a1: A1, a2: A2, a3: A3, a4: A4, ...args: any[]) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
      f5: (a: R4) => R5,
    ): (a1: A1, a2: A2, a3: A3, a4: A4, ...args: any[]) => R5
    <A1, A2, A3, A4, R1, R2, R3, R4, R5, R6>(
      f1: (a1: A1, a2: A2, a3: A3, a4: A4, ...args: any[]) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
      f5: (a: R4) => R5,
      f6: (a: R5) => R6,
    ): (a1: A1, a2: A2, a3: A3, a4: A4, ...args: any[]) => R6
    <A1, A2, A3, A4, R1, R2, R3, R4, R5, R6, R7>(
      f1: (a1: A1, a2: A2, a3: A3, a4: A4, ...args: any[]) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
      f5: (a: R4) => R5,
      f6: (a: R5) => R6,
      f7: (a: R6) => R7,
    ): (a1: A1, a2: A2, a3: A3, a4: A4, ...args: any[]) => R7
    <A1, A2, A3, A4, R1, R2, R3, R4, R5, R6, R7>(
      f1: (a1: A1, a2: A2, a3: A3, a4: A4, ...args: any[]) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
      f5: (a: R4) => R5,
      f6: (a: R5) => R6,
      f7: (a: R6) => R7,
      ...funcs: Array<Many<(a: any) => any>>
    ): (a1: A1, a2: A2, a3: A3, a4: A4, ...args: any[]) => any
    (funcs: Array<Many<(...args: any[]) => any>>): (...args: any[]) => any
  }

  // declare const flowMax: LodashFlow
  declare const flowMax: typeof flow

  type AddWrapperType = <AdditionalProps, TProps>(
    callback: (options: {
      render: (additionalProps?: AdditionalProps) => ReactElement | null
      props: TProps
    }) => ReactElement | null,
  ) => (props: TProps) => TProps & AdditionalProps

  declare const addWrapper: AddWrapperType

  type AddWrapperPositionalArgsType = <AdditionalProps, TProps>(
    callback: (
      render: (additionalProps?: AdditionalProps) => ReactElement | null,
      props: TProps,
    ) => ReactElement | null,
  ) => (props: TProps) => TProps & AdditionalProps

  declare const addWrapperPositionalArgs: AddWrapperPositionalArgsType

  type AddPropTypesType = <TPropTypes, TProps>(
    propTypes: ValidationMap<TPropTypes>,
  ) => (props: TProps) => TProps

  declare const addPropTypes: AddPropTypesType
}
