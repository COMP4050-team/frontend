import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Assignment = {
  __typename?: 'Assignment';
  dueDate: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  submissions: Array<Submission>;
  tests: Array<Test>;
};

export type Class = {
  __typename?: 'Class';
  assignments: Array<Assignment>;
  id: Scalars['ID'];
  name: Scalars['String'];
  unitID: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAssignment: Assignment;
  createClass: Class;
  createSubmission: Submission;
  createTest: Test;
  createUnit: Unit;
};


export type MutationCreateAssignmentArgs = {
  input: NewAssignment;
};


export type MutationCreateClassArgs = {
  input: NewClass;
};


export type MutationCreateSubmissionArgs = {
  input: NewSubmission;
};


export type MutationCreateTestArgs = {
  input: NewTest;
};


export type MutationCreateUnitArgs = {
  input: NewUnit;
};

export type NewAssignment = {
  classID: Scalars['ID'];
  dueDate: Scalars['String'];
  name: Scalars['String'];
};

export type NewClass = {
  name: Scalars['String'];
  unitID: Scalars['ID'];
};

export type NewSubmission = {
  assignmentID: Scalars['ID'];
  studentID: Scalars['String'];
};

export type NewTest = {
  assignmentID: Scalars['ID'];
  name: Scalars['String'];
};

export type NewUnit = {
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  assignment?: Maybe<Assignment>;
  assignments: Array<Assignment>;
  class?: Maybe<Class>;
  classes: Array<Class>;
  result?: Maybe<Result>;
  results: Array<Result>;
  submission?: Maybe<Submission>;
  submissions: Array<Submission>;
  test?: Maybe<Test>;
  tests: Array<Test>;
  unit?: Maybe<Unit>;
  units: Array<Unit>;
};


export type QueryAssignmentArgs = {
  id: Scalars['ID'];
};


export type QueryClassArgs = {
  id: Scalars['ID'];
};


export type QueryResultArgs = {
  id: Scalars['ID'];
};


export type QuerySubmissionArgs = {
  id: Scalars['ID'];
};


export type QueryTestArgs = {
  id: Scalars['ID'];
};


export type QueryUnitArgs = {
  id: Scalars['ID'];
};

export type Result = {
  __typename?: 'Result';
  date: Scalars['String'];
  id: Scalars['ID'];
  score: Scalars['Float'];
  submissionID: Scalars['ID'];
};

export type Submission = {
  __typename?: 'Submission';
  id: Scalars['ID'];
  result: Result;
  studentID: Scalars['String'];
};

export type Test = {
  __typename?: 'Test';
  assignmentID: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Unit = {
  __typename?: 'Unit';
  classes: Array<Class>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type GetUnitsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnitsQuery = { __typename?: 'Query', units: Array<{ __typename?: 'Unit', id: string, name: string }> };


export const GetUnitsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUnits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"units"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetUnitsQuery, GetUnitsQueryVariables>;