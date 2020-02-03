declare module 'ad-hok' {
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

  type AddPropsType = <TProps, AdditionalProps extends { [key: string]: any }>(
    createProps: ((props: TProps) => AdditionalProps) | AdditionalProps,
    dependencies?: Array<string>,
  ) => (props: TProps) => TProps & AdditionalProps

  declare const addProps: AddPropsType

  interface HandlerCreators<TProps> {
    [key: string]: (props: TProps) => (...args: any[]) => any
  }

  type AddHandlersType = <Creators extends HandlerCreators<TProps>, TProps>(
    handlerCreators: Creators,
    dependencies?: Array<keyof TProps>,
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
  ) => (
    props: TProps,
  ) => TProps & TState & { [K in keyof Updaters]: ReturnType<Updaters[K]> }

  declare const addStateHandlers: AddStateHandlersType
}
