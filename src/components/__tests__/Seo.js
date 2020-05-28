import React from 'react';
import { create, act } from 'react-test-renderer';
import { PureSEO as SEO } from '../Seo';
import { Helmet } from 'react-helmet';

describe('SEO render', () => {
  let component;
  let data;
  let meta;

  beforeAll(() => {
    data = {
      site: {
        siteMetadata: {
          title: 'Site New Title',
          description: 'Site New description',
          author: 'Site New Author',
        },
      },
    };

    meta = [
      {
        name: 'description',
        content: data.site.siteMetadata.description,
      },
      {
        property: 'og:title',
        content: data.site.siteMetadata.title,
      },
      {
        property: 'og:description',
        content: data.site.siteMetadata.description,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary',
      },
      {
        name: 'twitter:creator',
        content: data.site.siteMetadata.author,
      },
      {
        name: 'twitter:title',
        content: data.site.siteMetadata.title,
      },
      {
        name: 'twitter:description',
        content: data.site.siteMetadata.description,
      },
    ];
    component = create(<SEO title="Site title" />);
  });

  it('renders correctly', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('Verify helmet default data', () => {
    let instance = component.root;
    const helmet = instance.findByType(Helmet);

    expect(helmet.props.title).toEqual('Site title');

    expect(helmet.props.titleTemplate).toEqual('%s | Site title');

    const { lang } = helmet.props.htmlAttributes;
    expect(lang).toEqual('en');
  });

  it('Verify helmet exist with custom params', () => {
    act(() => {
      component.update(<SEO data={data} title="Site title" />);
    });
    let instance = component.root;
    const helmet = instance.findByType(Helmet);

    expect(helmet.props.title).toEqual('Site title');
  });

  it('Verify helmet custom props', () => {
    act(() => {
      component.update(<SEO data={data} title="Test title" lang="TEST" />);
    });
    let instance = component.root;
    const helmet = instance.findByType(Helmet);

    expect(helmet.props.title).toEqual('Test title');

    expect(helmet.props.titleTemplate).toEqual('%s | Site New Title');

    const { lang } = helmet.props.htmlAttributes;
    expect(lang).toEqual('TEST');
  });

  it('Helmet verify meta', () => {
    act(() => {
      component.update(
        <SEO data={data} title={data.site.siteMetadata.title} />
      );
    });
    let instance = component.root;
    const helmet = instance.findByType(Helmet);

    expect(helmet.props.meta).toEqual(meta);
  });

  it('Helmet verify meta concat', () => {
    let moreMeta = [{ property: 'OtherMeta', content: 'test meta' }];
    act(() => {
      component.update(
        <SEO data={data} title={data.site.siteMetadata.title} meta={moreMeta} />
      );
    });
    let instance = component.root;
    const helmet = instance.findByType(Helmet);

    expect(helmet.props.meta).toEqual(meta.concat(moreMeta));
  });
});
