/// <reference path="./flowMax.d.ts" />

declare module 'ad-hok' {
  import { ReactElement, MutableRefObject, Context, ComponentType } from 'react'
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

  type AddContextType = <TContextName extends string, TContext, TProps>(
    context: Context<TContext>,
    contextName: TContextName,
  ) => (props: TProps) => TProps & { [contextName in TContextName]: TContext }

  declare const addContext: AddContextType

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

  type BranchOneBranchType = <TProps>(
    test: (props: TProps) => boolean,
    // left: (props: TProps) => LeftProps,
    left: (props: TProps) => any,
  ) => (props: TProps) => TProps

  type BranchTwoBranchType = <LeftProps, RightProps, TProps>(
    test: (props: TProps) => boolean,
    left: (props: TProps) => LeftProps,
    right: (props: TProps) => RightProps,
  ) => // ) => (props: TProps) => LeftProps | RightProps
  (props: TProps) => RightProps

  declare const branch: BranchOneBranchType & BranchTwoBranchType

  type ReturnsType = <TProps>(
    callback: (props: TProps) => any,
  ) => (props: TProps) => TProps

  declare const returns: ReturnsType

  type RenderNothingType = <TProps>() => (props: TProps) => TProps

  declare const renderNothing: RenderNothingType

  declare const flowMax: FlowMaxType

  // type AddWrapperHOCType = <AddedProps, TProps>(
  //   hoc: (
  //     component: ComponentType<TProps>,
  //   ) => ComponentType<EnhancedProps & AddedProps>,
  // ) => (props: TProps) => TProps & AddedProps

  export type PropAddingHOCType<AddedProps> = (
    component: ComponentType<any>,
  ) => ComponentType<any>

  type AddWrapperHOCType = <AddedProps, TProps>(
    hoc: PropAddingHOCType<AddedProps>,
  ) => (props: TProps) => TProps & AddedProps

  declare const addWrapperHOC: AddWrapperHOCType
}
