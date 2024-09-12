import React from 'react';
import Button from '../../common/misc/Button';
import { injectIntl } from 'react-intl';

@injectIntl
class OrganizerPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  togglePopup = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    const { organizeUrl, gen3Url, intl } = this.props;
    const { isOpen } = this.state;

    return (
      <div className="OrganizeMenu">
        <div 
          className="OrganizeMenu-organize Header-navLink linkOrganize"
          onClick={this.togglePopup}
        >
          { intl.formatMessage({ id: 'header.organize'}) }
        </div>
        {isOpen && (
          <div className="OrganizeMenu-Popup">
            <div>
              <a 
                href={gen3Url}
                className="OrganizeMenu-PopupLink new-portal"
              >
                { intl.formatMessage({ id: "header.newOrganizePortal" }) }
              </a>
            </div>
            <div>
              <a 
                href={organizeUrl}
                className="OrganizeMenu-PopupLink old-portal"
              >
                { intl.formatMessage({ id: "header.oldOrganizePortal" }) }
              </a>
            </div>
          </div>
        )}
        <style jsx>{`

        `}</style>
      </div>
    );
  }
}

export default OrganizerPopup;