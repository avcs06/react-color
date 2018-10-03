/* global test, jest, expect */

import React from 'react'
import renderer from 'react-test-renderer'
import color, { red } from '../../helpers/color'
import { mount } from 'enzyme'

import Chrome from './Chrome'
import ChromeFields from './ChromeFields'
import ChromePointer from './ChromePointer'
import ChromePointerCircle from './ChromePointerCircle'
import { Alpha, EditableInput } from '../common'


test.skip('Chrome renders correctly', () => {
  const tree = renderer.create(
    <Chrome { ...red } />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Chrome onChange events correctly', () => {
  const changeSpy = jest.fn((data) => {
    expect(color.simpleCheckForValidColor(data)).toBeTruthy()
  })
  const tree = mount(
    <Chrome { ...red } onChange={ changeSpy } />,
  )
  expect(changeSpy).toHaveBeenCalledTimes(0)

  // check the Alpha component
  const alphaCommon = tree.find(Alpha)
  alphaCommon.at(0).childAt(2).simulate('mouseDown', {
    pageX: 100,
    pageY: 10,
  })
  expect(changeSpy).toHaveBeenCalledTimes(1)

  // TODO: check the Hue component
  // TODO: check the ChromeFields
  // TODO: check Saturation
})

test('Chrome onFocus, onBlur event callbacks are called correctly', () => {
  const focusSpy = jest.fn()
  const blurSpy = jest.fn()
  const tree = mount(
    <Chrome {...red} onFocus={focusSpy} onBlur={blurSpy} />,
  )
  expect(focusSpy).toHaveBeenCalledTimes(0)
  expect(blurSpy).toHaveBeenCalledTimes(0)

  // check the Alpha component
  const chromeFields = tree.find(EditableInput)
  chromeFields.at(0).childAt(0).simulate('focus')
  expect(focusSpy).toHaveBeenCalledTimes(1)

  chromeFields.at(0).childAt(0).simulate('blur')
  expect(blurSpy).toHaveBeenCalledTimes(1)
})

// test('Chrome renders on server correctly', () => {
//   const tree = renderer.create(
//     <Chrome renderers={{ canvas }} { ...red } />
//   ).toJSON()
//   expect(tree).toMatchSnapshot()
// })

test.skip('ChromeFields renders correctly', () => {
  const tree = renderer.create(
    <ChromeFields { ...red } />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('ChromePointer renders correctly', () => {
  const tree = renderer.create(
    <ChromePointer />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('ChromePointerCircle renders correctly', () => {
  const tree = renderer.create(
    <ChromePointerCircle {...red} />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
