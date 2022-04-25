import { useContractFunction, useEthers } from '@usedapp/core'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { NFTList } from '../components/nftList/NFTList';
import { BorderRad, Colors, Shadows } from '../global/styles';
import { Web3Storage, Upload} from 'web3.storage'
import { WEB3_STORAGE_API_KEY } from '../global/apiKeys';
import { Button, FormControl, InputGroup, Tab, Tabs } from 'react-bootstrap';
import { Contract } from '@ethersproject/contracts'
import { ethers } from 'ethers'
import {TypedContract} from '@usedapp/core/dist/esm/src/model/types';
import { SoulMintFactoryConfig, useSoulMintFactory } from '../customHooks/useSoulMintFactory';
import {differenceBy} from 'lodash'
import DataTable from 'react-data-table-component';
import { generateIpfsLink, makeFileObject, ModifiedNftMetaData, SideQuestNFTMetaData, StandardNftMetaData } from '../utils/nftMetadataHelper';
import { listUploads } from '../api/fileUploadsApi';

    const columns = [
        {
            name: 'Name',
            selector: (row:any) => row.name,
            sortable: true,
        },
        {
            name: 'Cid',
            selector: (row:any) => row.cid,
        },
        {
            name: 'Date',
            selector: (row:any) => row.created,
            sortable: true,
        },
    ];
    

export function DashBoardPage() {
    const { chainId, account, library } = useEthers();
    const [selectedFile, setSelectedFile] = useState();
    const [currentIpfsLinks, setCurrentIpfsLinks] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [contract, setContract] = useState<Contract | null>(null)
    const [pending, setPending] = useState(true);
    const [allUploads, setUploads] = useState<Upload[]>([]);
    const [filteredUploads, setFilteredUploads] = useState<Upload[]>([]);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const signer = library?.getSigner();
    const [userHasMintedFactory, setMintedFactoryState] = useState<boolean>(false)
    let contractConfig: SoulMintFactoryConfig| null| undefined = useSoulMintFactory();
    const mintOne = useContractFunction(contractConfig?.contract as TypedContract, 'mintOne', { transactionName: 'Mint' });
    const deploySoulMint = useContractFunction(contractConfig?.factoryContract as TypedContract, 'deployOne', { transactionName: 'CreateProfile' });
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [key, setKey] = useState('home');


    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);


    const contextActions = useMemo(() => {
        const handleDelete = () => {
                
                if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map((r:any) => r.name)}?`)) {
                    // setToggleCleared(!toggleCleared);
                    // setFilteredItems(differenceBy(filteredItems, selectedRows, 'name'));
                }
        };


        const handleInitialFactoryMint = async ( 
            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => {
            e.preventDefault();
            if(!contractConfig){
                return;
            }
            if(!contractConfig.factoryContract){
                return;
            }
            deploySoulMint.send("SoulMintTest", "SMT", "http://foo.bar/");
        }

        const handleMint = async () => {
            if(!signer) {
                console.error('no account connected.');
                return;
            }
            
            if (window.confirm(`Are you sure you want to Tokenize:\r ${selectedRows.map((r:Upload) => r.name)}?`)) {
                const metadataFile = generateIPFSMetaDataFile(selectedRows);
                if(metadataFile == undefined) {
                    console.error('error creating metadata file.');
                    return;
                }
                setIsUploading(true);
                const [cid, deals] = await storeFiles([metadataFile], getDefaultFileName());
                setIsUploading(false);
                refreshUploads();
                setToggleCleared(!toggleCleared);
                const eventId = Math.random() % 100000;
                mintOne.send(ethers.utils.parseEther(eventId.toString()),account);
            }
        };

        const generateIPFSMetaDataFile = (uploads: Upload[]) => {

            if(!account){
                return;
            }

            const uris = uploads.map((upload)=> {
                return `ipfs://${upload.cid}`
            })
            const contributions = uploads.length;
            const randomId = Math.random() % 100000;
            const randomName = `SoulShard:${randomId}`;
            const randomDescription = `SoulShard with ${contributions} contributions.`;
            const attributes = [
                  {
                    "trait_type": "Contributions", 
                    "value": contributions
                  }, 
                  {
                    "trait_type": "Type", 
                    "value": "Individual"
                  }, 
            ];

            const standardMetadata: StandardNftMetaData =  {
                name : randomName,
                description: randomDescription,
                external_url : 'SideQuestUrl',
                attributes: attributes,
            };

            const sideQuestMetadata: SideQuestNFTMetaData = {
                contentUris: uris,
                chainId: chainId,
                signer: account,
                contract: contractConfig?.contract?.address,
            }

            const modifiedNftData: ModifiedNftMetaData = {
                ...standardMetadata,
                sideQuest: sideQuestMetadata
            }

            return makeFileObject(modifiedNftData, randomName);
        }

        return (
            <div>
            {contractConfig && userHasMintedFactory == false && 
            <Button variant="outline-success" style={{ marginRight: '0.5em' }}
            onClick={handleInitialFactoryMint}
            >Mint Profile</Button>
            }
            <Button variant="primary" key="tokenize" onClick={handleMint} style={{ marginRight: '0.5em' }}
            disabled={userHasMintedFactory === false}
            >
                Tokenize
            </Button>
            <Button key="delete" variant="outline-danger" onClick={handleDelete} >
                Delete
            </Button>
            </div>
            
        );
    }, [selectedRows, toggleCleared]);


    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
                if (filterText) {
                    setResetPaginationToggle(!resetPaginationToggle);
                    setFilterText('');
                }
            };

        return (
            <InputGroup size="sm" className="mb-3" style={{maxWidth: '20em'}}>
            <FormControl
            placeholder="search"
            aria-label="Search"
            aria-describedby="basic-addon1"
            onChange={e => setFilterText(e.target.value)}
            />
            <Button 
            variant="outline-secondary" id="button-addon2"
            onClick={handleClear}
            >
                Clear
            </Button>
        </InputGroup>    
        );
    }, [filterText, resetPaginationToggle]);

    useEffect(() => {
        ;(async () => {
            refreshUploads();
        })()
    }, [account])




    useEffect(() => {
        ;(async () => {
            updateFilteredItems();
        })()
    }, [filterText])


    useEffect(() => {
        ;(async () => {
            if(!contractConfig){
                setMintedFactoryState(false);
            } else {
                setMintedFactoryState(contractConfig.hasMintedFactory);
            }
        })()
    // account ORR chainID changed
    }, [account,chainId, contractConfig])


    const updateFilteredItems = ()=> {
        const filtered = allUploads ? allUploads.filter(
            (item: any) => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
        ) : [];
        setFilteredUploads(filtered);
    }
    

    const refreshUploads = async()=> {
        setToggleCleared(!toggleCleared);
        setPending(true);
        const uploads = await listUploads()
        setUploads(uploads);
        setFilteredUploads(uploads)
        setPending(false);
    }

    const changeHandler = (event:any) => {
        setSelectedFile(event.target.files[0]);
    };



  

  const handleUpload = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const fileInput: any = document.querySelector('input[type="file"]');
    if(!fileInput || fileInput.files.length === 0){
        console.error('No files selected');
        return;
    }
    setIsUploading(true);
    await storeFiles(fileInput.files, fileInput.files[0].name);
    setIsUploading(false);
    refreshUploads();
  };

  const getDefaultFileName = (): string => {
      return `SoulShard-${Math.floor(Math.random() * 10000000)}`
  }


  const storeFiles = async(files: File[], fileName: string): Promise<any[]>=> {
    // Construct with token and endpoint
    const client = new Web3Storage({ token: WEB3_STORAGE_API_KEY })
    // Pack files into a CAR and send to web3.storage
    const cid = await client.put(files, {
        name: fileName
    });
    // Get info on the Filecoin deals that the CID is stored in
    const info = await client.status(cid);
    return [cid,info];
  }



  const handleMint = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if(!signer){
        return;
    }
     const eventId = Math.random() * 10000000;
     mintOne.send(ethers.utils.parseEther(eventId.toString()),account);
    };

  return (
    <div>
        { account ? (<DashboardContainer>
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k: any) => setKey(k)}
            className="mb-3"
            >    
            <Tab eventKey="home" title="Home">
                <Board>
                    {/* <div style={{flexGrow: '2'}}>
                        <div style={{margin: '0.5em', height: '50%', backgroundColor: Colors.Blue[200], borderRadius: '.25rem'}}></div>
                    </div>                     */}
                    <div style={{
                        flexGrow: '1', 
                        border:'solid', 
                        borderWidth: '0.5px', 
                        borderTop: 'none',
                        borderBottom: 'none',
                        borderColor: Colors.Gray[300]
                        }}>
                        <NFTBoard></NFTBoard>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', flexGrow: '3'}}>
                        <div style={{margin: '0.5em', height: '50%', backgroundColor:' #cee4f6', borderRadius: '.25rem'}}>
                                
                            <Text style={{margin: '1em'}}>
                                Favourites
                            </Text>
                        </div>
                        <div style={{margin: '0.5em', height: '50%', backgroundColor: '#cee4f6', borderRadius: '.25rem'}}>
                                
                                <Text style={{margin: '1em'}}>
                                    Active Quests
                                </Text>
                        </div>
                    </div>
                </Board>  
                      
            </Tab>
            <Tab eventKey="uploads" title="Uploads">
                <div style={{display: 'flex'}}>
                <InputGroup size="sm" className="mb-3" style={{maxWidth: '20em'}}>
                    <FormControl
                    aria-label="upload"
                    aria-describedby="basic-addon1"
                    type="file" 
                    name="file"
                    onChange={changeHandler}
                    />
                    <Button 
                variant="outline-primary" id="button-addon2"
                    onClick={handleUpload}
                    >
                    Upload
                    </Button>
                </InputGroup>
                {isUploading && <Text style={{marginLeft: '0.5em', marginTop: '0.4em', color: 'green'}}>Uploading...</Text>} 
                </div>
            
                <DataTable
                title="Files/Links"
                subHeaderComponent={subHeaderComponentMemo}
                subHeader
                progressComponent={<Text>Loading...</Text>}
                progressPending={pending}
                columns={columns}
                data={filteredUploads}
                contextActions={contextActions}
                onSelectedRowsChange={handleRowSelected}
                fixedHeaderScrollHeight="300px"
                highlightOnHover
                pagination
                responsive
                selectableRows
                selectableRowsHighlight
                striped
                subHeaderWrap
                clearSelectedRows={toggleCleared}
                expandableRows
                expandOnRowClicked
                expandableRowsComponent={ExpandedComponent}

                />  
            </Tab>
        </Tabs>
    </DashboardContainer>) : 
    (<DashboardContainer>

<Section>
<Text>Connect to view Dashboard</Text>
</Section>
    </DashboardContainer>)
  }
  </div>
  )
}

const NFTBoard = ()=> {
    return (
        <div>
            <NFTList />
        </div>
    )
}


// data provides access to your row data
const ExpandedComponent = ({data}: any) => 
<div style={{display: 'flex'}}>
    <a href={generateIpfsLink(data.cid)} target="_blank" rel="noopener noreferrer">
        <Text style={{marginLeft: '5em', marginTop: '1em'}}>{generateIpfsLink(data.cid)}</Text>
    </a>
</div>;

const DashboardContainer = styled.div `
  display: flex;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-right: 5em;
  margin-left: 5em;
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

export const Board = styled(SubSection)`
    display:flex;
    box-shadow: ${Shadows.main};
    background-color: aliceblue;
    height: 600px;
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

export const UploadSection = styled(SubSection)`
    display:flex;
    flex-direction: column;
    box-shadow: ${Shadows.main};
    background-color: #aliceblue;
`

export const UrlLinkSection = styled(SubSection)`
    display:flex;
    flex-direction: column;
    box-shadow: ${Shadows.main};
    background-color: #aliceblue;
    justify-content:center;
    max-width: 300px;
    overflow: scroll;
`

export const UrlLink = styled.div`
    margin: 1em;

`
export const UploadActionButton = styled(Button)`
  margin: 0.5em;
  background-color:#1DA1F2;
  border-color:#1DA1F2;

  &:disabled {
    background-color:grey;
    border-color:grey;
  }

`

export const UploadActionInput = styled.input`
  margin: 0.5em;
  color: ${Colors.Black[900]};
  border: 1px solid ${Colors.Black[900]};
  border-radius: ${BorderRad.m};
  background-color: transparent;

`


//  const LeaderBoard = ()=> {
//     return (
//         <div>
//             <div style={{margin:'0.5em', color:'white'}}>
//             <Text>Leader Board</Text>
//             </div>
//             <LeaderboardList/>
//         </div>
//     )
// }
