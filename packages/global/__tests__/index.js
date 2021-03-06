// @flow
import 'test-utils/no-test-mode'
import * as React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import Global from '@emotion/global'

beforeEach(() => {
  // $FlowFixMe
  document.head.innerHTML = ''
  // $FlowFixMe
  document.body.innerHTML = `<div id="root"></div>`
})

test('basic', () => {
  render(
    <Global
      css={{
        html: {
          backgroundColor: 'hotpink'
        }
      }}
    />,
    // $FlowFixMe
    document.getElementById('root')
  )
  expect(document.head).toMatchSnapshot()
  expect(document.body).toMatchSnapshot()
  unmountComponentAtNode(document.getElementById('root'))
  expect(document.head).toMatchSnapshot()
  expect(document.body).toMatchSnapshot()
})
