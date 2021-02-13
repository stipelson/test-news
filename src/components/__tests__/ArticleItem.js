import React from 'react';
import { create, act } from 'react-test-renderer';

import ArticleItem from '../ArticleItem';

describe('ArticleItem: render', () => {
  let component;
  let instance;
  let tree;

  beforeAll(() => {
    component = create(<ArticleItem />);
    tree = component.toJSON();
    instance = component.root;
  });

  it('renders article item correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('has the link class', () => {
    const link = instance.findByType('a');
    expect(link.props.className).toEqual('list-item');
  });

  it('has the image class', () => {
    const img = instance.findByType('img');
    expect(img.props.className).toEqual('list-item-image');
  });

  it('Image ever has alt', () => {
    const img = instance.findByType('img');
    expect(img.props.alt).toEqual('Article image');
  });

  it('Image has alt equal to title', () => {
    const title = 'Test Article Title';
    act(() => {
      component.update(<ArticleItem title={title} />);
    });

    instance = component.root;
    const img = instance.findByType('img');
    expect(img.props.alt).toEqual(title);
  });

  it('Title prop is rendered correctly', () => {
    const title = 'Test Article Title';
    act(() => {
      component.update(<ArticleItem title={title} />);
    });

    instance = component.root;
    const titleNode = instance.findByType('h3');
    expect(titleNode.children).toEqual([title]);
  });

  it('Body prop is rendered correctly', () => {
    const body = 'Test Article Title';
    act(() => {
      component.update(<ArticleItem body={body} />);
    });

    instance = component.root;
    const bodyNode = instance.findByType('p');
    expect(bodyNode.children).toEqual([body]);
  });
});
