import { formatUnits } from '@ethersproject/units'
import { ChainId, useEthers } from '@usedapp/core'
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import styled from 'styled-components'
import { Colors } from '../../global/styles'
import { TextBold, Text} from '../../global/typography'

const TEST_USERS = [
  {
    address : '0xdana.eth',
    id: '10',
    index: '50',
    count: 5,
  },
  {
    address : 'jo.eth',
    id: '11',
    index: '51',
    name: 'Quest DAO',
    count: 5


  },
  {
    address : 'kate.eth',
    id: '12',
    index: '52',
    name: 'Quest DAO',
    count: 5


  },
  {
    address : 'mary.eth',
    id: '13',
    index: '53',
    name: 'Quest DAO',
    count: 5

  },

  {
    address : '0xmike.eth',
    id: '10',
    index: '50',
    name: 'Quest DAO',
    count: 5

  },
  {
    address : 'mo.eth',
    id: '11',
    index: '51',
    name: 'Quest DAO',
    count: 5


  },
  {
    address : 'liz.eth',
    id: '12',
    index: '52',
    name: 'Quest DAO',
    count: 5


  },
  {
    address : 'jess.eth',
    id: '13',
    index: '53',
    name: 'Quest DAO',
    count: 5

  },

  {
    address : 'dan.eth',
    id: '13',
    index: '53',
    name: 'Quest DAO',
    count: 5

  },
  {
    address : 'jen.eth',
    id: '13',
    index: '53',
    name: 'Quest DAO',
    count: 5

  },

]

export function LeaderboardList() {
  const [leaders, setLeaders] = useState(TEST_USERS);

  useEffect(() => {
    // leaders changed
  }, [leaders])
  return (
    <div style={{height: '400px', overflow: 'scroll'}}>
      {!leaders? (<Spinner animation="grow" /> ): (
        <LeaderBoardListContainer>
        {leaders && leaders.map((leader: any, idx:number) => {
              return (
         
                  <LeaderItem key={`SubSection-${idx}`}> 
                        {leader.address && <LeaderAttribute>{idx+1}</LeaderAttribute>} 
                        {leader.address && <LeaderAttribute>{leader.address}</LeaderAttribute>} 
                        {leader.count && <LeaderScore>{leader.count}</LeaderScore>}                    
                   
                  </LeaderItem>
           
          )})}
        </LeaderBoardListContainer>
    )}
    </div>
  )
}

const LeaderBoardListContainer = styled.div`
display: flex;
flex-direction: column;
height: 100%;
`
export const Button = styled.button`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  align-items: center;
  width: fit-content;
  height: 40px;
  font-size: 14px;
  line-height: 24px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${Colors.Black[900]};
  border: 1px solid ${Colors.Black[900]};
  background-color: transparent;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${Colors.Black[900]};
    color: ${Colors.Yellow[100]};
  }
`

const LeaderItem = styled.li`
  display: flex;
  border: 1px solid #ebebeb;
  background: rgb(60, 60, 60);
  background: #ffd8d866;
  margin:0.5em;
`

const LeaderAttribute = styled(Text)`
margin: 0.4em;
font-size: 12px;
`

const LeaderScore = styled(TextBold)`
  margin: 0.4em;
  font-size: 12px;
`