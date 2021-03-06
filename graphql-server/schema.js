const _ = require('lodash');
import { resolver, attributeFields, defaultArgs } from 'graphql-sequelize';

import {
  Acquisition,
  Degree,
  FundingRound,
  Fund,
  Investment,
  IPO,
  Milestone,
  Object,
  Office,
  People,
  Relationship,
} from './db';

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';

const AcquisitionType = new GraphQLObjectType({
  name: 'Acquisition',
  fields: _.assign(attributeFields(Acquisition)),
});

const DegreeType = new GraphQLObjectType({
  name: 'Degree',
  fields: _.assign(attributeFields(Degree)),
});

const FundingRoundType = new GraphQLObjectType({
  name: 'FundingRound',
  fields: _.assign(attributeFields(FundingRound)),
});

const FundType = new GraphQLObjectType({
  name: 'Fund',
  fields: _.assign(attributeFields(Fund)),
});

const InvestmentType = new GraphQLObjectType({
  name: 'Investment',
  fields: _.assign(attributeFields(Investment)),
});

const IPOType = new GraphQLObjectType({
  name: 'IPO',
  fields: _.assign(attributeFields(IPO)),
});

const MilestoneType = new GraphQLObjectType({
  name: 'Milestone',
  fields: _.assign(attributeFields(Milestone)),
});

const OfficeType = new GraphQLObjectType({
  name: 'Office',
  fields: _.assign(attributeFields(Office)),
});

const RelationshipType = new GraphQLObjectType({
  name: 'Relationship',
  fields: _.assign(attributeFields(Relationship)),
});

const ObjectType = new GraphQLObjectType({
  name: 'Object',
  fields: _.assign(attributeFields(Object)),
});

const PeopleType = new GraphQLObjectType({
  name: 'People',
  fields: _.assign(attributeFields(People), {
    degree: {
      type: new GraphQLList(DegreeType),
      resolve: resolver(People.Degrees, {
        separate: true,
      }),
    },
    company: {
      type: new GraphQLList(ObjectType),
      resolve: resolver(People.Companies, {
        separate: true,
      }),
    },
    // fund: {
    //   type: new GraphQLList(FundType),
    //   resolve: resolver(People.Funds, {
    //     separate: true,
    //   }),
    // },
  }),
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      acquisition: {
        type: AcquisitionType,
        args: defaultArgs(Acquisition),
        resolve: resolver(Acquisition),
      },
      degree: {
        type: DegreeType,
        args: defaultArgs(Degree),
        resolve: resolver(Degree),
      },
      fundingRound: {
        type: FundingRoundType,
        args: defaultArgs(FundingRound),
        resolve: resolver(FundingRound),
      },
      fund: {
        type: FundType,
        args: defaultArgs(Fund),
        resolve: resolver(Fund),
      },
      investment: {
        type: InvestmentType,
        args: defaultArgs(Investment),
        resolve: resolver(Investment),
      },
      IPO: {
        type: IPOType,
        args: defaultArgs(IPO),
        resolve: resolver(IPO),
      },
      milestone: {
        type: MilestoneType,
        args: defaultArgs(Milestone),
        resolve: resolver(Milestone),
      },
      object: {
        type: ObjectType,
        args: defaultArgs(Object),
        resolve: resolver(Object),
      },
      office: {
        type: OfficeType,
        args: defaultArgs(Office),
        resolve: resolver(Office),
      },
      people: {
        type: PeopleType,
        args: defaultArgs(People),
        resolve: resolver(People),
      },
      relationship: {
        type: RelationshipType,
        args: defaultArgs(Relationship),
        resolve: resolver(Relationship),
      },
    },
  }),
});

module.exports = schema;
