export function convertToUnit( value: number, unit?: string ): string;
export function convertToUnit( value: string | null | undefined, unit?: string ): string | undefined;
export function convertToUnit( value: string | number | null | undefined, unit: string = 'px' ): string | undefined {
  if(value === null || value === undefined) {
    return undefined
  }

  const num = Number(value)

  if(Number.isNaN(num)) {
    return String(value)
  } else if(!isFinite(num)) {
    return undefined
  } else {
    return `${num}${unit}`
  }
}
