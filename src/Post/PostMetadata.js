import React from 'react';
import "Post/PostMetadata.css";
import { getTokenMetadata } from 'APIController/APIHandler';
import { formatDate, shortenAddress } from 'Helper/helper';
import chevron from 'res/icons/down-arrow.png';
import ArticleIcon from '@mui/icons-material/Article';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SvgIcon from '@mui/material/SvgIcon';

function detailContainer(title, data, clickable) {
    return (
        <div className={title === "Owner" ? "detailsRowFirst" : "detailsRow"}>
            <div className='detailsLeft'>
                <h4 className='detailTitle'>{title}</h4>
            </div>
            <div className='detailsRight'>
                <h4 className='detailData'><a href={`https://etherscan.io/address/${data}`} target="_blank" className="detailData" style={{ pointerEvents: clickable ? "auto" : "none", color: clickable ? "default" : "#6e6e6e" }}>{data.includes("0x") ? shortenAddress(data) : data}</a></h4>
            </div>
        </div>
    )
}

class PostMetadata extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            metadata: {},
            status: "",
            createdAt: "",
            owner: "",
            contractAddress: "",
            isDescriptionOpen: true,
            isDetailsOpen: true,
        }
    }

    componentDidMount(){
        this.getPostMetadata();
    }

    getPostMetadata(){
        getTokenMetadata(this.props.id)
        .then((response) => {
            let data = response.result[0]
            this.setState({ metadata: data.metadata, status: data.status.toUpperCase(), createdAt: formatDate(data.created_at), owner: data.user, contractAddress: data.token_address })
        })
    }

    createDetailContainer() {
        let detailArray = [
            detailContainer("Owner", this.state.owner, true),
            detailContainer("Token ID", this.props.id),
            detailContainer("Layer", this.state.status),
            detailContainer("Contract Address", this.state.contractAddress, true),
            detailContainer("Created", this.state.createdAt)
        ]

        return detailArray
    }

    setIsDescriptionOpen() {
        this.setState({ isDescriptionOpen: !this.state.isDescriptionOpen })
    }

    setIsDetailsOpen() {
        this.setState({ isDetailsOpen: !this.state.isDetailsOpen })
    }
  
    render() {
        return (
            <div className='postMetadata'>
                <div className='postMetadataHeader'>
                    <h3 className='status'>{this.state.status}</h3>
                    <img src={this.state.metadata.image} className="metadataImage"/>
                </div>
                <div className='postMetadataInfo'>
                    <div className='descriptionContainer' onClick={() => this.setIsDescriptionOpen()}>
                        <div className='descriptionTextAndIcon'>
                        <SvgIcon>
                            <ArticleIcon/>
                        </SvgIcon>
                        <h3 className='descriptionHeader'>Description</h3>
                        </div>
                        {this.state.isDescriptionOpen
                        ? <img src={chevron} style={{transform: 'rotate(180deg)', transition: 'transform 150ms ease'}} className="DescriptionChevron"/>
                        : <img src={chevron} className="DescriptionChevron"/>
                        }
                    </div>
                    {this.state.isDescriptionOpen && <h4 className='description'>This is a post on GrapeVyn</h4>}
                </div>
                <div className='postMetadataInfo'>
                    <div className='descriptionContainer' onClick={() => this.setIsDetailsOpen()}>
                    <div className='descriptionTextAndIcon'>
                    <SvgIcon>
                        <FormatListBulletedIcon/>
                    </SvgIcon>
                    <h3 className='detailsHeader'>Details</h3>
                    </div>
                    {this.state.isDetailsOpen
                        ? <img src={chevron} style={{transform: 'rotate(180deg)', transition: 'transform 150ms ease'}} className="DescriptionChevron"/>
                        : <img src={chevron} className="DescriptionChevron"/>
                    }
                    </div>
                    {this.state.isDetailsOpen && this.createDetailContainer().map((item) => item)}
                </div>
            </div>
        );
    }
}

export default PostMetadata