import React from 'react';
import { create, act } from 'react-test-renderer';
import Row from 'emerald-ui/lib/Row';
import Col from 'emerald-ui/lib/Col';
import TextField from 'emerald-ui/lib/TextField';
import Checkbox from 'emerald-ui/lib/Checkbox';

import ContactForm from '../ContactForm';

describe('ContactForm: render', () => {
  let component;
  let tree;
  let instance;

  beforeAll(() => {
    component = create(<ContactForm />);
    tree = component.toJSON();
    instance = component.root;
  });

  it('renders contact form correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Section has id', () => {
    const section = instance.findByType('section');
    expect(section.props.id).toEqual('contact');
  });

  it('Content has class', () => {
    const content = instance.findByType('div');
    expect(content.props.className).toEqual('container');
  });

  it('Rows has class, except last', () => {
    const allRows = instance.findAllByType(Row);

    for (let index = 0; index < allRows.length - 1; index++) {
      expect(allRows[index].props.className).toEqual('extra-p-md-6');
    }
  });

  it('Cols has class', () => {
    const allCols = instance.findAllByType(Col);

    for (let index = 0; index < allCols.length; index++) {
      expect(allCols[index].props.className).toEqual('mb-46');
    }
  });

  it('Checkbox props render', () => {
    act(() => {
      component.update(<ContactForm title="Contact Us" />);
    });

    let newInstance = component.root;

    const title = newInstance.findByType('h2');
    expect(title.children).toEqual(['Contact Us']);
  });
});

describe('ContactForm: submit', () => {
  const event = {
    preventDefault: jest.fn(),
  };
  const onSubmitMock = jest.fn();
  const formData = {
    first_name: 'Test name',
    last_name: 'Test Last name',
    email: 'test@test.com',
    phone: '8005555555',
    message: 'Test message',
    email_subscription: false,
  };
  let component;
  let form;
  let instance;
  let textInputs;
  let messageInput;

  beforeEach(() => {
    act(() => {
      component = create(
        <ContactForm title="Contact Us" onValidForm={onSubmitMock} />
      );
    });

    instance = component.root;
    form = instance.findByType('form');
    // Get form inputs
    textInputs = form.findAllByType(TextField);
    messageInput = form.findByProps({ name: 'message' });
  });

  it('Contact form submit with empty values', () => {
    const form = instance.findByType('form');

    act(() => {
      form.props.onSubmit(event);
    });

    expect(onSubmitMock).toHaveBeenCalledTimes(0);
  });

  it('Contact form submit without first name', () => {
    // Manual change input values
    act(() => {
      for (let index = 0; index < textInputs.length; index++) {
        const input = textInputs[index];
        // Change all except first_name
        if (input.props.name !== 'first_name') {
          input.props.onChange({
            ...event,
            target: {
              name: input.props.name,
              value: formData[input.props.name],
              error: '',
            },
          });
        }
      }
      messageInput.props.onChange({
        ...event,
        target: { name: 'message', value: 'Test message' },
      });
    });

    // Submit form
    act(() => {
      form.props.onSubmit(event);
    });

    const firstName = form.findByProps({ name: 'first_name' });
    // Check if called
    expect(onSubmitMock).toHaveBeenCalledTimes(0);
    expect(firstName.props.errorMessage).toEqual('This is required field.');
  });

  it('Contact form submit without last name', () => {
    // Manual change input values
    act(() => {
      for (let index = 0; index < textInputs.length; index++) {
        const input = textInputs[index];
        // Change all except last_name
        if (input.props.name !== 'last_name') {
          input.props.onChange({
            ...event,
            target: {
              name: input.props.name,
              value: formData[input.props.name],
              error: '',
            },
          });
        }
      }
      messageInput.props.onChange({
        ...event,
        target: { name: 'message', value: 'Test message' },
      });
    });

    // Submit form
    act(() => {
      form.props.onSubmit(event);
    });

    const lastName = form.findByProps({ name: 'last_name' });
    // Check if called
    expect(onSubmitMock).toHaveBeenCalledTimes(0);
    expect(lastName.props.errorMessage).toEqual('This is required field.');
  });

  it('Contact form submit without email', () => {
    // Manual change input values
    act(() => {
      for (let index = 0; index < textInputs.length; index++) {
        const input = textInputs[index];
        // Change all except email
        if (input.props.name !== 'email') {
          input.props.onChange({
            ...event,
            target: {
              name: input.props.name,
              value: formData[input.props.name],
              error: '',
            },
          });
        }
      }
      messageInput.props.onChange({
        ...event,
        target: { name: 'message', value: 'Test message' },
      });
    });

    // Submit form
    act(() => {
      form.props.onSubmit(event);
    });

    const emailInput = form.findByProps({ name: 'email' });
    // Check if called
    expect(onSubmitMock).toHaveBeenCalledTimes(0);
    expect(emailInput.props.errorMessage).toEqual('This is required field.');
  });

  it('Contact form submit without phone', () => {
    // Manual change input values
    act(() => {
      for (let index = 0; index < textInputs.length; index++) {
        const input = textInputs[index];
        // Change all except phone
        input.props.onChange({
          ...event,
          target: {
            name: input.props.name,
            value:
              input.props.name === 'phone' ? '' : formData[input.props.name],
            error: '',
          },
        });
      }
      messageInput.props.onChange({
        ...event,
        target: { name: 'message', value: 'Test message' },
      });
    });

    // Submit form
    act(() => {
      form.props.onSubmit(event);
    });

    const phone = form.findByProps({ name: 'phone' });
    // Check if called
    expect(onSubmitMock).toHaveBeenCalledTimes(0);
    expect(phone.props.errorMessage).toEqual('This is required field.');
  });

  it('Contact form submit without message', () => {
    // Manual change input values
    act(() => {
      for (let index = 0; index < textInputs.length; index++) {
        const input = textInputs[index];
        input.props.onChange({
          ...event,
          target: {
            name: input.props.name,
            value: formData[input.props.name],
            error: '',
          },
        });
      }
    });

    // Submit form
    act(() => {
      form.props.onSubmit(event);
    });

    const messageInput = form.findByProps({ name: 'message' });
    // Check if called
    expect(onSubmitMock).toHaveBeenCalledTimes(0);
    expect(messageInput.props.errorMessage).toEqual('This is required field.');
  });

  it('Contact form submit with wrong email', () => {
    // Manual change input values
    act(() => {
      for (let index = 0; index < textInputs.length; index++) {
        const input = textInputs[index];
        // Change all except first_name
        input.props.onChange({
          ...event,
          target: {
            name: input.props.name,
            value:
              input.props.name === 'email'
                ? 'Bad Email'
                : formData[input.props.name],
            error: '',
          },
        });
      }
      messageInput.props.onChange({
        ...event,
        target: { name: 'message', value: 'Test message' },
      });
    });

    // Submit form
    act(() => {
      form.props.onSubmit(event);
    });

    const emailInput = form.findByProps({ name: 'email' });
    // Check if called
    expect(onSubmitMock).toHaveBeenCalledTimes(0);
    // Error message
    expect(emailInput.props.errorMessage).toEqual(
      'Please enter a valid email address.'
    );
  });

  it('Contact form submit with wrong phone', () => {
    // Manual change input values
    act(() => {
      for (let index = 0; index < textInputs.length; index++) {
        const input = textInputs[index];
        // Change all except first_name
        input.props.onChange({
          ...event,
          target: {
            name: input.props.name,
            value:
              input.props.name === 'phone'
                ? 'Bad phone'
                : formData[input.props.name],
            error: '',
          },
        });
      }
      messageInput.props.onChange({
        ...event,
        target: { name: 'message', value: 'Test message' },
      });
    });

    // Submit form
    act(() => {
      form.props.onSubmit(event);
    });

    const phoneInput = form.findByProps({ name: 'phone' });
    // Check if called
    expect(onSubmitMock).toHaveBeenCalledTimes(0);
    // Error message
    expect(phoneInput.props.errorMessage).toEqual(
      'The phone must have 10 numbers, ex: 8005555555.'
    );
  });

  it('Contact form change state checkbox', () => {
    // Manual change input values
    const checkInput = form.findByType(Checkbox);
    act(() => {
      // Change all except first_name
      checkInput.props.onChange({
        ...event,
        target: {
          name: 'email_subscription',
          checked: true,
          type: 'checkbox',
          error: '',
        },
      });
    });

    // console.log(checkInput.props);
    // Error message
    expect(checkInput.props.checked).toEqual(true);
  });

  it('Contact form submit with correct values', () => {
    /* let component;

    // First State empty values
    act(() => {
      component = create(
        <ContactForm title="Contact Us" onValidForm={onSubmitMock} />
      );
    });
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = component.root;
    const form = instance.findByType('form');

    // Get form inputs
    const textInputs = form.findAllByType(TextField);
    const message = form.findByProps({ name: 'message' }); */

    // Manual change input values
    act(() => {
      for (let index = 0; index < textInputs.length; index++) {
        const input = textInputs[index];
        input.props.onChange({
          ...event,
          target: {
            name: input.props.name,
            value: formData[input.props.name],
            error: '',
          },
        });
      }

      messageInput.props.onChange({
        ...event,
        target: { name: 'message', value: 'Test message' },
      });
    });

    // Submit form
    act(() => {
      form.props.onSubmit(event);
    });

    // Check if called
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    //  Check payload data from submit callaback
    expect(onSubmitMock).toHaveBeenLastCalledWith(
      JSON.stringify(formData, null, 2)
    );
  });
});
