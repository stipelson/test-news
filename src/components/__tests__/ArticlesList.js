import React from 'react';
import { create } from 'react-test-renderer';
import sinon from 'sinon';
import Row from 'emerald-ui/lib/Row';

import ArticlesList from '../ArticlesList';
import ArticleItem from '../ArticleItem';

describe('ArticlesList: render', () => {
  it('No passed articles and render correctly', () => {
    const component = create(<ArticlesList />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = component.root;

    const items = instance.findAllByType(ArticleItem);
    expect(items.length).toBe(0);
  });

  it('Row has the class', () => {
    const component = create(<ArticlesList />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = component.root;

    const row = instance.findByType(Row);
    expect(row.props.className).toEqual('extra-p-md-6');
  });

  it('Passed articles and render list correctly', () => {
    const article = {
      body: '- The advancements in the field  ...',
      image:
        'https://cdn.pixabay.com/photo/2016/03/21/23/25/link-1271843_960_720.png',
      title: 'Constant Technological ...',
      url: 'https://www.google.com',
    };

    const articles = [article, article, article, article];

    const component = create(<ArticlesList articles={articles} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    let instance = component.root;

    // Expected list of articles
    const items = instance.findAllByType(ArticleItem);
    expect(items.length).toBe(articles.length);
  });
});

describe('ArticlesList: throws error when', () => {
  let error;

  beforeEach(() => {
    error = sinon.stub(console, 'error');
  });

  afterEach(() => {
    error.restore();
  });

  it('Not-array-articles is passed to articles list', () => {
    const articles = 'This is a string';

    create(<ArticlesList articles={articles} />);

    expect(error.called).toEqual(true);
  });
});
