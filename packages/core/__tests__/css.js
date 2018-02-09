// @flow
/** @jsx jsx */
import jsx from '@emotion/jsx'
import Style from '@emotion/style'
import Global from '@emotion/global'
import Dynamic from '@emotion/dynamic'
import css from '@emotion/css'
import keyframes from '@emotion/keyframes'
import renderer from 'react-test-renderer'

test('thing', () => {
  const tree = renderer.create(
    <div>
      <div css={{ display: 'flex' }}>something</div>
    </div>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('css call to render', () => {
  const cls = css`
    color: green;
  `
  const tree = renderer.create(
    <div>
      <Style styles={cls} />
      <div className={cls.toString()}>something</div>
    </div>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('keyframes', () => {
  const animation = keyframes(css`
    from {
      color: green;
    }
    to {
      color: hotpink;
    }
  `)
  const tree = renderer.create(
    <div>
      <Style styles={animation} />
      <div
        css={css`
          animation: ${animation}${true};
        `}
      >
        {animation.toString()}
      </div>
    </div>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('global', () => {
  const tree = renderer.create(
    <div>
      <Global
        css={css`
          body {
            color: hotpink;
          }
        `}
      />
    </div>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('dynamic', () => {
  const tree = renderer.create(
    <div>
      <Dynamic
        css={css`
          color: hotpink;
        `}
        render={className => <div className={className} />}
      />
    </div>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('functions get toStringed in css calls', () => {
  expect(
    css`
      ${() => {}};
    `
  ).toMatchSnapshot()
})

test('css call composition', () => {
  const first = css`
    color: hotpink;
  `
  const second = css({ ':hover': first })
  expect(second).toMatchSnapshot()
})
