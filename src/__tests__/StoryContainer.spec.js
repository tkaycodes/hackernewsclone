import React from 'react'
import { StoriesContainer } from '../containers/StoriesContainer';
import {render, cleanup, waitForElement } from '@testing-library/react';
import { storyIds, singularStory } from '../fixtures';
import { getStory, getStoryIds } from '../services/api';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { STORY_INCREMENT } from '../constants';

beforeEach(cleanup);

jest.mock('../hooks/useInfiniteScroll.js');
jest.mock('../services/api', () => ({
    getStory: jest.fn(),
    getStoryIds: jest.fn(),
}));

test('reders the story container component with a story', async() => {
    useInfiniteScroll.mockImplementation(()=> ({
        count: STORY_INCREMENT
    }));
    getStory.mockImplementation(() => Promise.resolve(singularStory));
    getStoryIds.mockImplementation(() => Promise.resolve(storyIds));

    const { getByText, queryByTestId } = render(<StoriesContainer />);
    await waitForElement(() => [
        expect(getByText('Hacker News Stories')).toBeTruthy(),
        expect(getByText('My First Story')).toBeTruthy(),
        expect(queryByTestId('story-by').textContent).toEqual('By: Tabish Khan'),
    ]);
});