import React from 'react';
import renderer from 'react-test-renderer';

import ArticleItem from '../ArticleItem';

describe('ArticleItem: render', () => {
  it('renders article item correctly', () => {
    const tree = renderer.create(<ArticleItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has the link class', () => {
    const component = renderer.create(<ArticleItem />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = component.root;

    const link = instance.findByType('a');
    expect(link.props.className).toEqual('list-item');
  });

  it('has the image class', () => {
    const component = renderer.create(<ArticleItem />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = component.root;

    const img = instance.findByType('img');
    expect(img.props.className).toEqual('list-item-image');
  });

  it('Image ever has alt', () => {
    const component = renderer.create(<ArticleItem />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = component.root;

    const img = instance.findByType('img');
    expect(img.props.alt).toEqual('Article image');
  });

  it('Image has alt equal to title', () => {
    const title = 'Test Article Title';
    const component = renderer.create(<ArticleItem title={title} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = component.root;

    const img = instance.findByType('img');
    expect(img.props.alt).toEqual(title);
  });

  it('Title prop is rendered correctly', () => {
    const title = 'Test Article Title';
    const component = renderer.create(<ArticleItem title={title} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = component.root;

    const titleNode = instance.findByType('h3');
    expect(titleNode.children).toEqual([title]);
  });

  it('Body prop is rendered correctly', () => {
    const body = 'Test Article Title';
    const component = renderer.create(<ArticleItem body={body} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = component.root;

    const bodyNode = instance.findByType('p');
    expect(bodyNode.children).toEqual([body]);
  });
});
