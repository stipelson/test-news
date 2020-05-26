import React from 'react';
import { create, act } from 'react-test-renderer';
import Row from 'emerald-ui/lib/Row';
import Col from 'emerald-ui/lib/Col';

import ContactForm from '../ContactForm';

describe('ContactForm: render', () => {
  it('renders contact form correctly', () => {
    const tree = create(<ContactForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Section has id', () => {
    const component = create(<ContactForm />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = component.root;

    const section = instance.findByType('section');
    expect(section.props.id).toEqual('contact');
  });

  it('Content has class', () => {
    const component = create(<ContactForm />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = component.root;

    const content = instance.findByType('div');
    expect(content.props.className).toEqual('container');
  });

  it('Rows has class, except last', () => {
    const component = create(<ContactForm />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = component.root;

    const allRows = instance.findAllByType(Row);

    for (let index = 0; index < allRows.length - 1; index++) {
      expect(allRows[index].props.className).toEqual('extra-p-md-6');
    }
  });

  it('Cols has class', () => {
    const component = create(<ContactForm />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = component.root;

    const allCols = instance.findAllByType(Col);

    for (let index = 0; index < allCols.length; index++) {
      expect(allCols[index].props.className).toEqual('mb-46');
    }
  });

  it('Checkbox props render', () => {
    const component = create(
      <ContactForm title="Contact Us" onValidForm={() => {}} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = component.root;

    const title = instance.findByType('h2');
    expect(title.children).toEqual(['Contact Us']);
  });
});

describe('ContactForm: submit', () => {
  it('Contact form submit with empty values', () => {
    const onSubmitMock = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    let component;
    act(() => {
      component = create(
        <ContactForm title="Contact Us" onValidForm={onSubmitMock} />
      );
    });
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = component.root;
    const form = instance.findByType('form');

    act(() => {
      form.props.onSubmit(event);
    });
    // expect(onSubmitMock).toHaveBeenLastCalledWith(1);
    expect(onSubmitMock).toHaveBeenCalledTimes(0);
  });

  it('Contact form submit with values', () => {
    const data = {
      first_name: 'Test name',
      last_name: 'Test Last name',
      email: 'test@test.com',
      phone: '8005555555',
      message: 'Test message',
      email_subscription: false,
    };
    const onSubmitMock = jest.fn();

    const event = {
      preventDefault: jest.fn(),
      target: { name: 'fname', value: 'text' },
    };
    let component;

    // First State

    act(() => {
      component = create(
        <ContactForm title="Contact Us" onValidForm={onSubmitMock} />
      );
    });
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = component.root;
    const form = instance.findByType('form');
    const fname = instance.findByProps({ name: 'fname' });
    const lname = instance.findByProps({ name: 'lname' });
    const email = instance.findByProps({ name: 'email' });
    const phone = instance.findByProps({ name: 'phone' });
    const message = instance.findByProps({ name: 'message' });
    // Manual change input values
    act(() => {
      const inputEvent = {
        preventDefault: jest.fn(),
      };
      fname.props.onChange({
        ...inputEvent,
        target: { name: 'fname', value: 'Test name', error: '' },
      });
      lname.props.onChange({
        ...inputEvent,
        target: { name: 'lname', value: 'Test Last name' },
      });
      email.props.onChange({
        ...inputEvent,
        target: { name: 'email', value: 'test@test.com' },
      });
      phone.props.onChange({
        ...inputEvent,
        target: { name: 'phone', value: '8005555555' },
      });
      message.props.onChange({
        ...inputEvent,
        target: { name: 'message', value: 'Test message' },
      });
    });

    // Submit form
    act(() => {
      form.props.onSubmit(event);
    });

    // Check if called
    // expect(onSubmitMock).toHaveBeenCalledTimes(1);
    //  Check called mock function with form data
    expect(onSubmitMock).toHaveBeenLastCalledWith(
      JSON.stringify(data, null, 2)
    );
  });
});
