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
  classID: Scalars['ID'];
  dueDate: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
  submissions: Array<Submission>;
  tests: Array<Test>;
  unitID: Scalars['ID'];
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
  login: Scalars['String'];
  register: Scalars['String'];
  resetDB: Scalars['Boolean'];
  runTest: Scalars['Boolean'];
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


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRunTestArgs = {
  testID: Scalars['ID'];
};

export type NewAssignment = {
  classID: Scalars['ID'];
  dueDate: Scalars['Int'];
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
  storagePath: Scalars['String'];
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


export type QueryAssignmentsArgs = {
  from?: InputMaybe<Scalars['Int']>;
};


export type QueryClassArgs = {
  id: Scalars['ID'];
};


export type QueryClassesArgs = {
  from?: InputMaybe<Scalars['Int']>;
};


export type QueryResultArgs = {
  id: Scalars['ID'];
};


export type QueryResultsArgs = {
  from?: InputMaybe<Scalars['Int']>;
};


export type QuerySubmissionArgs = {
  id: Scalars['ID'];
};


export type QuerySubmissionsArgs = {
  from?: InputMaybe<Scalars['Int']>;
};


export type QueryTestArgs = {
  id: Scalars['ID'];
};


export type QueryTestsArgs = {
  from?: InputMaybe<Scalars['Int']>;
};


export type QueryUnitArgs = {
  id: Scalars['ID'];
};


export type QueryUnitsArgs = {
  from?: InputMaybe<Scalars['Int']>;
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
  unitID: Scalars['String'];
};

export type Unit = {
  __typename?: 'Unit';
  classes: Array<Class>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CreateAssignmentMutationVariables = Exact<{
  assignment: NewAssignment;
}>;


export type CreateAssignmentMutation = { __typename?: 'Mutation', createAssignment: { __typename?: 'Assignment', id: string, name: string } };

export type CreateClassMutationVariables = Exact<{
  class: NewClass;
}>;


export type CreateClassMutation = { __typename?: 'Mutation', createClass: { __typename?: 'Class', id: string, name: string } };

export type CreateSubmissionMutationVariables = Exact<{
  submission: NewSubmission;
}>;


export type CreateSubmissionMutation = { __typename?: 'Mutation', createSubmission: { __typename?: 'Submission', id: string, studentID: string } };

export type CreateTestMutationVariables = Exact<{
  test: NewTest;
}>;


export type CreateTestMutation = { __typename?: 'Mutation', createTest: { __typename?: 'Test', id: string, name: string, assignmentID: string } };

export type CreateUnitMutationVariables = Exact<{
  unit: NewUnit;
}>;


export type CreateUnitMutation = { __typename?: 'Mutation', createUnit: { __typename?: 'Unit', id: string, name: string } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: string };

export type GetAssignmentQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetAssignmentQuery = { __typename?: 'Query', assignment?: { __typename?: 'Assignment', id: string, classID: string, unitID: string, name: string, tests: Array<{ __typename?: 'Test', id: string, name: string }>, submissions: Array<{ __typename?: 'Submission', id: string, studentID: string, result: { __typename?: 'Result', id: string } }> } | null };

export type GetAssignmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAssignmentsQuery = { __typename?: 'Query', assignments: Array<{ __typename?: 'Assignment', id: string, name: string }> };

export type GetClassQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetClassQuery = { __typename?: 'Query', class?: { __typename?: 'Class', id: string, name: string, assignments: Array<{ __typename?: 'Assignment', id: string, name: string, dueDate: number }> } | null };

export type GetClassesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetClassesQuery = { __typename?: 'Query', classes: Array<{ __typename?: 'Class', id: string, name: string, unitID: string }> };

export type GetSubmissionQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetSubmissionQuery = { __typename?: 'Query', submission?: { __typename?: 'Submission', id: string, studentID: string } | null };

export type GetSubmissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSubmissionsQuery = { __typename?: 'Query', submissions: Array<{ __typename?: 'Submission', id: string, studentID: string }> };

export type GetTestQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetTestQuery = { __typename?: 'Query', test?: { __typename?: 'Test', id: string, name: string, assignmentID: string, unitID: string } | null };

export type GetTestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTestsQuery = { __typename?: 'Query', tests: Array<{ __typename?: 'Test', id: string, name: string }> };

export type GetUnitQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUnitQuery = { __typename?: 'Query', unit?: { __typename?: 'Unit', id: string, name: string, classes: Array<{ __typename?: 'Class', id: string, name: string }> } | null };

export type GetUnitsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnitsQuery = { __typename?: 'Query', units: Array<{ __typename?: 'Unit', id: string, name: string }> };


export const CreateAssignmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createAssignment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assignment"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewAssignment"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAssignment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assignment"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateAssignmentMutation, CreateAssignmentMutationVariables>;
export const CreateClassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createClass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"class"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewClass"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createClass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"class"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateClassMutation, CreateClassMutationVariables>;
export const CreateSubmissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createSubmission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"submission"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewSubmission"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSubmission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"submission"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"studentID"}}]}}]}}]} as unknown as DocumentNode<CreateSubmissionMutation, CreateSubmissionMutationVariables>;
export const CreateTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"test"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewTest"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"test"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"assignmentID"}}]}}]}}]} as unknown as DocumentNode<CreateTestMutation, CreateTestMutationVariables>;
export const CreateUnitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUnit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"unit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewUnit"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUnit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"unit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateUnitMutation, CreateUnitMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const GetAssignmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAssignment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"classID"}},{"kind":"Field","name":{"kind":"Name","value":"unitID"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"submissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"studentID"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAssignmentQuery, GetAssignmentQueryVariables>;
export const GetAssignmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAssignments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetAssignmentsQuery, GetAssignmentsQueryVariables>;
export const GetClassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getClass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"class"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"assignments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}}]}}]}}]}}]} as unknown as DocumentNode<GetClassQuery, GetClassQueryVariables>;
export const GetClassesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getClasses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"classes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"unitID"}}]}}]}}]} as unknown as DocumentNode<GetClassesQuery, GetClassesQueryVariables>;
export const GetSubmissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSubmission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"studentID"}}]}}]}}]} as unknown as DocumentNode<GetSubmissionQuery, GetSubmissionQueryVariables>;
export const GetSubmissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSubmissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"studentID"}}]}}]}}]} as unknown as DocumentNode<GetSubmissionsQuery, GetSubmissionsQueryVariables>;
export const GetTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"test"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"assignmentID"}},{"kind":"Field","name":{"kind":"Name","value":"unitID"}}]}}]}}]} as unknown as DocumentNode<GetTestQuery, GetTestQueryVariables>;
export const GetTestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetTestsQuery, GetTestsQueryVariables>;
export const GetUnitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUnit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"classes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetUnitQuery, GetUnitQueryVariables>;
export const GetUnitsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUnits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"units"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetUnitsQuery, GetUnitsQueryVariables>;