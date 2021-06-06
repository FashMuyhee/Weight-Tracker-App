import React from 'react';
import styled from 'styled-components/native';
import colors from '../utils/colors';

export const Text = styled.Text`
  font-family: ${props =>
    props.isTitle || props.isBold ? 'PTSans-Bold' : 'PTSans-Regular'};
  color: ${props => (props.color ? props.color : colors.primary)};
  font-size: ${props =>
    props.isTitle ? '25px' : props.size ? props.size : '18px'};
  text-transform: ${props => (props.case ? props.case : 'none')};
  text-align: ${props => (props.isCenter ? 'center' : 'left')};
`;

export const Container = styled.View`
  background-color: ${props =>
    props.bgColor ? props.bgColor : colors.bgColor};
  padding: ${props => (props.pad ? '20px' : '0px')};
  height: ${props => props.height};
`;

export const ScrollContainer = styled.ScrollView`
  background-color: ${props =>
    props.bgColor ? props.bgColor : colors.bgColor};
  padding: ${props => (props.pad ? '20px' : '0px')};
  height: ${props => props.height};
  flex: 1;
`;

export const RowBetween = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Card = styled.View`
  border-radius: 10px;
  padding: 20px;
  background-color: ${props => (props.bgColor ? props.bgColor : colors.light)};
  min-height: 70px;
  margin-bottom: 10px;
`;
