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

  interface HandlerCreators<TProps> {
    [key: string]: (props: TProps) => (...arg: any[]) => any
  }

  type AddHandlersType = <Creators extends HandlerCreators<TProps>, TProps>(
    handlerCreators: Creators,
    dependencies?: Array<keyof TProps>,
  ) => (
    props: TProps,
  ) => TProps & { [K in keyof Creators]: ReturnType<Creators[K]> }

  declare const addHandlers: AddHandlersType
}
