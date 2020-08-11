import React, {useState} from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Card from '../shared/Card';
import {setIsExportingPlaylist} from '../../redux/actions';
import './ExportPlaylist.scss';
import {saveToPlaylist} from '../../redux/actionCreators';
import classnames from 'classnames';

const modalStyle = {
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: 0,
  width: 400,
  height: 'auto',
  bottom: 'auto',
  overflow: 'visible'
};

const modalOverlayStyle = {
  backgroundColor: 'rgba(64, 64, 64, 0.25)'
}

const ExportPlaylist = ({playlistTracks, close, saveToPlaylist}) => {
  const [playlistName, setPlaylistName] = useState('');
  
  return (
    <Modal isOpen style={{content: modalStyle, overlay: modalOverlayStyle}}
           shouldCloseOnOverlayClick shouldCloseOnEsc
           onRequestClose={close}>
      <Card title={'Export to a new Spotify playlist'}
            buttonContent={<FontAwesomeIcon icon={faTimes}/>}
            buttonAction={close}
            className={'export-playlist'}>
        <div className={'playlist-name-input'}>
          <input className={'form-control form-control-lg'} type={'text'}
                 placeholder={'Name your playlist'}
                 onChange={e => setPlaylistName(e.target.value)} value={playlistName}
                 autoFocus={true}/>
        </div>
        <div className={'col-sm-12 pt-4 text-center'}>
          <button type='button' className={classnames('btn btn-primary btn-block', {'disabled': playlistName === ''})} onClick={() => {
            if (playlistName.length > 0 && playlistTracks && playlistTracks.length > 0) {
              saveToPlaylist(playlistName, playlistTracks)
            }
          }}>
            {'Export'}
          </button>
        </div>
      </Card>
    </Modal>
  );
};

ExportPlaylist.propTypes = {
  playlistTracks: PropTypes.arrayOf(PropTypes.object),
  close: PropTypes.func,
  saveToPlaylist: PropTypes.func
};

const mapStateToProps = ({playlistTracks}) => ({
  playlistTracks
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(setIsExportingPlaylist(false)),
  saveToPlaylist: (playlistName, playlistTracks) => saveToPlaylist(playlistName, playlistTracks)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ExportPlaylist);