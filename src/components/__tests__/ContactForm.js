import React from 'react';
import renderer from 'react-test-renderer';

import ContactForm from '../ContactForm';

describe('ContactForm', () => {
  it('renders contact form correctly', () => {
    const tree = renderer
      .create(
        <ContactForm
          title="Contact Us"
          onValidForm={() => {
            return false;
          }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
