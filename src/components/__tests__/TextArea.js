import React from 'react';
import { create, act } from 'react-test-renderer';

import TextArea from '../TextArea';

describe('TextArea', () => {
  it('renders textarea correctly', () => {
    const tree = create(
      <TextArea
        label="Message"
        rows="4"
        name="message"
        onChange={() => {
          return false;
        }}
        value=""
        errorMessage={undefined}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an input textarea by default', () => {
    const tree = create(<TextArea />);
    const instance = tree.root;
    const component = instance.findByType('textarea');
    expect(component.props.className).toEqual('custom-textarea');
  });

  it('renders an input textarea by default', () => {
    const tree = create(<TextArea />);
    const instance = tree.root;
    const component = instance.findByType('textarea');
    expect(component.props.className).toEqual('custom-textarea');
  });

  it('TextArea test onChange', () => {
    const onChangeMock = jest.fn();
    const event = {
      target: { value: 'This is just for test' },
    };
    let component;

    act(() => {
      component = create(
        <TextArea
          label="Message"
          rows="4"
          name="message"
          onChange={onChangeMock}
          value="Pre value"
          errorMessage={undefined}
        />
      );
    });

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = component.root;

    // If no exist textarea get error
    const textArea = instance.findByType('textarea');

    // Value is passed down to the input
    expect(textArea.props.value).toEqual('Pre value');

    // manually trigger the onchange
    textArea.props.onChange(event);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually change value
    // update with some different props
    act(() => {
      component.update(
        <TextArea
          label="Message"
          rows="4"
          name="message"
          onChange={onChangeMock}
          value={event.target.value}
          errorMessage={undefined}
        />
      );
    });
    // make assertions on root
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('Change value of textarea manually', () => {
    const onChangeMock = jest.fn();
    const event = {
      target: { value: 'This is just for test' },
    };
    let component;

    act(() => {
      component = create(
        <TextArea
          label="Message"
          rows="4"
          name="message"
          onChange={onChangeMock}
          value="Pre value"
          errorMessage={undefined}
        />
      );
    });

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually change value
    // update with some different props
    act(() => {
      component.update(
        <TextArea
          label="Message"
          rows="4"
          name="message"
          onChange={onChangeMock}
          value={event.target.value}
          errorMessage={undefined}
        />
      );
    });
    // make assertions on root
    expect(component.toJSON()).toMatchSnapshot();
  });
});
