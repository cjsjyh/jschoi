import BaseComponent from '@web/components/shared/BaseComponent'

export interface ComponentProps {
  $parent?: HTMLElement
  isReturnStr?: boolean
  params?: { [key: string]: string }
}

export interface RouteType {
  path: string
  component: typeof BaseComponent
}

export interface FoundComponentType extends RouteType {
  isMatch: boolean
  params?: { [key: string]: string }
}
