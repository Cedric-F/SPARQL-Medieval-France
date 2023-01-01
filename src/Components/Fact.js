import React, { Component } from 'react';
import {Modal, Button, Image, Tooltip, OverlayTrigger} from 'react-bootstrap';

export default class Fact extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: true,
      data: {}
    };
  }

  /*
   * When closing the Modal, reset the query to display back the whole list view, and route back to the "home page"
   */
  handleClose() {
    this.setState({ show: false });
    this.props.resetQuery('');
    this.props.history.push(`${process.env.PUBLIC_URL}/`);
  }

  getWiki(building) {

    console.log("getWiki")

    const b = this.props.locations.Castle.filter(castle => castle.name == building)[0];
    if (b) {
      this.setState({data: b});
    }

  }

  /*
   * Once the component is mounted, get the data to render.
   */
  componentDidMount() {
    console.log("componentDidMount");
    const { name } = this.props.data.location.state;
    this.getWiki(name);
  }

  render() {
    console.log(this.state.data)
    const { name, photo, source } = this.props.data.location.state;
    const tooltip = (
      <Tooltip id="modal-tooltip" tabIndex="0">{source ? `Wikipedia and ${source}` : 'Wikipedia'}</Tooltip>
    );

    return (
      <div>
       <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{name.replaceAll('_', ' ')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="source">
              <Image className="thumbnail" src={this.state.data.thumbnail} alt={`A photo of ${name}`} tabIndex="0" responsive />
              <OverlayTrigger overlay={tooltip}>
                <a href={`https://en.wikipedia.org/wiki/${name}`} target='_blank' rel="noopener noreferrer" >Sources</a>
              </OverlayTrigger>
            </p>

            <hr />

            <h4 tabIndex="0">History</h4>
            {
              /*
               * The wikipedia article is returned as a raw text,
               * So we use this method to parse the html tags.
               */
            }
            <p dangerouslySetInnerHTML={{__html: this.state.data.abstract}} tabIndex="0" />

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose} name="Close" aria-label="Close the Info Window">Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
