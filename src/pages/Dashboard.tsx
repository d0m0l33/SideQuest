import { useEthers } from '@usedapp/core'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { LeaderboardList } from '../components/leaderBoardList/LeaderBoardList';
import { NFTList } from '../components/nftList/NFTList';
import { Shadows } from '../global/styles';

export function DashBoardPage() {
  const { chainId, account, library } = useEthers();

  useEffect(() => {
    // account ORR chainID changed
  }, [account,chainId])

  return (
    <div>
        { account ? (<DashboardContainer>
    <Section>
        <button onClick={(e) => handleUpload(e)}>upload </button>
    </Section>
    <Section>
        <BoardPrimary>
            <NFTBoard></NFTBoard>
        </BoardPrimary>
        <BoardSecondary>
            <LeaderBoard/>
        </BoardSecondary>
    </Section>
    </DashboardContainer>) : 
    (<DashboardContainer>

<Section>
<Text>Connect for Dashboard...</Text>
</Section>
    </DashboardContainer>)
  }
  </div>
  )
}

const handleUpload = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();


    const blob = new Blob([`Test string`], { type: "text/plain" });
    const file = new File([blob], "welcome.txt", {
      type: "text/plain",
      lastModified: new Date().getTime(),
    });

    // const { id, cid } = await storage.store(file);
    // setLastStorageId(id);
    // console.log('id : ',id);
    // console.log('cid : ',cid);
  };

const LeaderBoard = ()=> {
    return (
        <div>
            <div style={{margin:'0.5em', color:'white'}}>
            <Text>Leader Board</Text>

            </div>
            <LeaderboardList/>
        </div>
    )
}


const NFTBoard = ()=> {
    return (
        <div>
            {/* <Text>Proof of Contributions</Text> */}
            <NFTList />
        </div>
    )
}

const DashboardContainer = styled.div `
  display: flex;
  margin: 1em;
  column-gap: 10px;
  row-gap: 10px;
  flex-direction:column;

`
export const Text = styled.p`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
`

export const Section = styled.div`
    display:flex;
`
export const SubSection = styled.div`
    display:flex;
    margin-right:0.5em;

`
export const BoardPrimary = styled(SubSection)`
    display:flex;
    flex-grow: 2;
    flex-direction: column;
    box-shadow: ${Shadows.main};
    background-color: aliceblue;`


export const BoardSecondary = styled(SubSection)`
    display:flex;
    flex-grow: 1;
    flex-direction: column;
    box-shadow: ${Shadows.main};
    background-color: #1DA1F2;
`


