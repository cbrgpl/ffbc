export type TooltipLayout = 'row' | 'col' | 'row-reverse' | 'col-reverse'

export type TooltipProps = {
  /** Displayed tooltip message */
  content?: string;
  /** Defines layout of primary element and tip button
   * row - <el> <tip> in row
   * col - <el> <tip> in column
   * row-reverse - <tip> <el> in row
   * col-reverse - <tip> <el> in column
   */
  layout?: TooltipLayout
  /** Defer tooltip bubble portal */
  defer?: boolean;
  /** Makes bubble to be visible always */
  persist?: boolean;
}

export type TooltipOwnerProps = {
  /** Displayed tooltip message */
  tooltipContent?: TooltipProps['content'];
  /** Defines layout of primary element and tip button
   * row - <el> <tip> in row
   * col - <el> <tip> in column
   * row-reverse - <tip> <el> in row
   * col-reverse - <tip> <el> in column
   */
  tooltipLayout?: TooltipProps['layout'];
  /** Defer tooltip bubble portal */
  tooltipDefer?: TooltipProps['defer'];
  /** Makes bubble to be visible always */
  tooltipPersist?: TooltipProps['persist'];
}

export type TooltipSlots = {
  /** Anchor element arouch which bubble will be shown */
  anchor?: ( props: { layout?: TooltipLayout } ) => unknown;
  /** Tooltip bubble content */
  content?: ( props: { tooltip?: string } ) => unknown; 
}

export type TooltipOwnerSlots = {
  /** Anchor element arouch which bubble will be shown */
  'tooltip-anchor'?: TooltipSlots['anchor']
  /** Tooltip bubble content */
  'tooltip-content'?: TooltipSlots['content']
}