// @flow
import type { Interpolation, ScopedInsertableStyles } from '@emotion/types'
import { hashString } from 'emotion-utils'
import { handleInterpolation, labelPattern } from '@emotion/serialize'

function css(
  strings: Interpolation | string[],
  ...interpolations: Interpolation[]
): ScopedInsertableStyles & { toString: () => string } {
  let stringMode = true
  let styles: string = ''
  let identifierName = ''

  if (strings == null || strings.raw === undefined) {
    stringMode = false
    styles += handleInterpolation.call(this, strings)
  } else {
    styles += strings[0]
  }

  interpolations.forEach(function(interpolation, i) {
    styles += handleInterpolation.call(this, interpolation)
    if (stringMode === true && strings[i + 1] !== undefined) {
      styles += strings[i + 1]
    }
  }, this)
  styles = styles.replace(labelPattern, (match, p1: string) => {
    identifierName += `-${p1}`
    return ''
  })

  const ret: Object = {
    styles,
    type: 1,
    get cls() {
      delete this.cls
      this.cls = `css-${this.name}`
      return this.cls
    },
    get name() {
      delete this.name
      this.name = hashString(styles) + identifierName
      return this.name
    },
    toString() {
      return `css-${this.name}`
    }
  }
  return ret
}

export default css
