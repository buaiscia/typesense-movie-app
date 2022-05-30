import React from 'react';
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import styled from 'styled-components'
import {
  InstantSearch,
  Hits,
  SearchBox,
  RefinementList,
  Pagination,
} from 'react-instantsearch-dom';

import './App.css';
import Card from './components/Card';

const TitleBox = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    padding: 50px 0;
`

const SearchPanel = styled.div`
  display: flex;
`

const SearchPanelFilters = styled.div`
  list-style: none;
   min-width: 300px;
`

const SearchBoxContainer = styled.div`
  min-width: 1200px;
`

const PaginationContainer = styled.div`
  padding: 100px 0;
`

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: 'xyz', // Be sure to use the search-only-api-key
    nodes: [
      {
        host: 'localhost',
        port: '8108',
        protocol: 'http',
      },
    ],
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  queryBy is required.
  additionalSearchParameters: {
    query_by: 'title',
  },
});

const searchClient = typesenseInstantsearchAdapter.searchClient;

function App() {
  return (
    <div>
      <TitleBox>
        <h1>
          Typesense Movie App
        </h1>
      </TitleBox>

      <div>
        <InstantSearch searchClient={searchClient} indexName="movies5">
          <SearchPanel>
            <SearchPanelFilters>
              <RefinementList attribute="genre" />
            </SearchPanelFilters>

            <SearchBoxContainer>
              <SearchBox
                translations={{
                  placeholder: '',
                }}
              />
              <Hits hitComponent={Card} />

              <PaginationContainer>
                <Pagination />
              </PaginationContainer>
            </SearchBoxContainer>
          </SearchPanel>
        </InstantSearch>
      </div>
    </div>
  );
}


export default App;
