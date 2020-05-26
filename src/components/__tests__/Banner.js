import React from 'react';
import renderer from 'react-test-renderer';
import Col from 'emerald-ui/lib/Col';
import Button from 'emerald-ui/lib/Button';

import ParallaxImage from '../../assets/images/parallax-2x.jpg';
import Banner from '../Banner';

describe('Banner: render', () => {
  it('renders banner correctly', () => {
    const tree = renderer.create(<Banner />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has the section class', () => {
    const component = renderer.create(<Banner />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = component.root;

    const section = instance.findByType('section');
    expect(section.props.className).toEqual('banner');
  });

  it('img has the class', () => {
    const component = renderer.create(<Banner />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = component.root;

    const img = instance.findByType('img');
    expect(img.props.className).toEqual('banner-background');
  });

  it('container has the class', () => {
    const component = renderer.create(<Banner />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = component.root;

    // Verify container class
    const section = instance.findByType('section');
    const container = section.findByType('div');
    expect(container.props.className).toEqual('container banner-body');

    // Verify col class
    const col = section.findByType(Col);
    expect(col.props.className).toEqual('sample-col');

    // Verify title class
    const title = section.findByType('h2');
    expect(title.props.className).toEqual('text-white banner-title');

    // Verify body class
    const body = section.findByType('p');
    expect(body.props.className).toEqual('text-white');
  });

  it('Button has the class and caption', () => {
    const component = renderer.create(<Banner />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = component.root;

    // Verify button class
    const button = instance.findByType(Button);
    expect(button.props.className).toEqual('eui-btn-inverted btn-padding-lg');
    expect(button.props.shape).toEqual('outline');

    // Verify button > span exist
    const spans = button.findAllByProps({ className: 'caption' });
    expect(spans.length).toEqual(1);
  });
});

describe('Banner: content', () => {
  it('Banner render props content', () => {
    const actionMock = jest.fn();
    const component = renderer.create(
      <Banner
        title="Test title"
        content="Test content"
        buttonLabel="Test button label"
        buttonAriaLabel="Test button aria label"
        buttonAction={actionMock}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = component.root;

    const img = instance.findByType('img');
    expect(img.props.src).toEqual(ParallaxImage);

    // Verify title content
    const title = instance.findByType('h2');
    expect(title.props.children).toEqual('Test title');

    // Verify body content
    const body = instance.findByType('p');
    expect(body.props.children).toEqual('Test content');

    // Verify Button props render
    const button = instance.findByType(Button);
    expect(button.props.ariaLabel).toEqual('Test button aria label');

    const span = button.findByProps({ className: 'caption' });
    expect(span.children[0].children).toEqual(['Test button label']);
  });
});
