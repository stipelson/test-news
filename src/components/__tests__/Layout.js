import React from 'react';
import { create, act } from 'react-test-renderer';
import { PureLayout as Layout } from '../Layout';
import Header from '../Header';
import Alert from 'emerald-ui/lib/Alert';

describe('Index render', () => {
  let component;
  let data;

  beforeAll(() => {
    data = {
      site: {
        siteMetadata: {
          title: 'Default Starter',
          description: 'Site description',
          author: 'site author',
        },
      },
    };
    component = create(
      <Layout data={data} menuNav={false} userNav={false}>
        <div />
      </Layout>
    );
  });

  it('renders correctly', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('render with header h1 hidden coorectly', () => {
    act(() => {
      component.update(
        <Layout data={data} menuNav={false} userNav={false} hiddenTitle>
          <div />
        </Layout>
      );
    });

    const instance = component.root;
    const header = instance.findByType('h1');

    expect(header.children).toEqual(['Default Starter']);
  });

  it('render without query data', () => {
    act(() => {
      component.update(
        <Layout menuNav={false} userNav={false} hiddenTitle>
          <div />
        </Layout>
      );
    });

    const instance = component.root;
    const title = instance.findByType('h1');
    const header = instance.findByType(Header);

    expect(title.children).toEqual(['Site title']);

    expect(header.props.siteTitle).toEqual('Site title');
  });

  it('render alert', () => {
    const instance = component.root;
    const alert = instance.findByType(Alert);
    const alertContent = alert.findByProps({ className: 'caption' });

    expect(alertContent.children).toEqual([
      'Welcome to the new look of News.com. Keep scrolling to discover interesting new features and news.',
    ]);
  });

  it('Close alert', () => {
    const instance = component.root;
    const alert = instance.findByType(Alert);

    act(() => {
      alert.props.onDismiss();
    });

    const alerts = instance.findAllByType(Alert);
    expect(alerts.length).toEqual(0);
  });
});
