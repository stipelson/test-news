import React from 'react';
import { create, act } from 'react-test-renderer';

import TextArea from '../TextArea';

describe('TextArea', () => {
  let component;
  let instance;

  beforeAll(() => {
    component = create(<TextArea />);
    instance = component.root;
  });

  it('renders an input default textarea', () => {
    const textArea = instance.findByType('textarea');
    expect(component.toJSON()).toMatchSnapshot();
    expect(textArea.props.className).toEqual('custom-textarea');
  });

  it('renders textarea with data correctly', () => {
    act(() => {
      component.update(
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
      );
    });
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('TextArea test onChange', () => {
    const onChangeMock = jest.fn();
    const event = {
      target: { value: 'This is just for test, new value' },
    };

    act(() => {
      component.update(
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

    instance = component.root;

    // If no exist textarea get error
    const textArea = instance.findByType('textarea');

    // Value is passed down to the input
    expect(textArea.props.value).toEqual('Pre value');

    // manually trigger the onchange
    act(() => {
      textArea.props.onChange(event);
    });

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
    // Called mock
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(event);
  });

  it('Change value of textarea manually', () => {
    const onChangeMock = jest.fn();
    const event = {
      target: { value: 'After value' },
    };

    act(() => {
      component.update(
        <TextArea
          label="Message"
          rows="4"
          name="message"
          onChange={onChangeMock}
          value="Before value"
          errorMessage={undefined}
        />
      );
    });

    instance = component.root;
    expect(instance.props.value).toEqual('Before value');

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
    expect(instance.props.value).toEqual('After value');
  });
});
