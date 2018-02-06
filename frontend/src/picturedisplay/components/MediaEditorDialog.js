import React from 'react'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import {Tabs, Tab} from 'material-ui/Tabs'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { Map } from 'immutable'
import { white, primary, secondary } from '../../colors'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  centerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  tabs: {
    color: white,
    backgroundColor: primary
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  select: {
    paddingBottom: 25
  }
}

export default ({ closeDialog, item, mediaTypes, mediaStatuses, updateItem }) => {
  const current_mi = item ? item : Map()

  return (
    <div>
      <Dialog
        modal={false}
        open={item ? true : false}
        repositionOnUpdate={false}
        autoDetectWindowHeight={false}
        bodyStyle={{padding: 10}}
        onRequestClose={closeDialog}
      >
        <div style={styles.container}>
          <div style={styles.centerContainer}>
            <img src={current_mi.get('thumb_url')} />
          </div>
          <Tabs >
            <Tab style={styles.tabs} label="Basic">
              <div style={styles.container}>
                <div style={styles.row}>
                  <TextField
                    hintText={current_mi.get('name')}
                    floatingLabelText='Name'
                    floatingLabelFixed={true}
                  />
                </div>
                <div style={styles.row}>
                  <TextField
                    hintText={current_mi.get('description')}
                    multiLine={true}
                    floatingLabelText='Description'
                    floatingLabelFixed={true}
                  />
                </div>
                <div style={styles.row}>
                  <SelectField
                    floatingLabelText='Media Type'
                    floatingLabelFixed={true}
                    onChange={ (e, i, v) => updateItem(current_mi.set('media_type_cd', v))}
                    value={ current_mi.get('media_type_cd') }
                  >
                    {mediaTypes.valueSeq().map(x =>
                      <MenuItem key={x.get('media_type_cd')}
                        value={x.get('media_type_cd')}
                        primaryText={x.get('name')} />
                    )}
                  </SelectField>
                </div>
                <div style={styles.row}>
                  <SelectField
                    floatingLabelText='Status'
                    floatingLabelFixed={true}
                    onChange={ (e, i, v) => updateItem(current_mi.set('status_cd', v)) }
                    value={current_mi.get('status_cd')}
                  >
                    {mediaStatuses.valueSeq().map(x =>
                      <MenuItem key={x.get('status_cd')}
                        value={x.get('status_cd')}
                        primaryText={x.get('name')} />
                    )}
                  </SelectField>
                </div>
              </div>
            </Tab>
            <Tab style={styles.tabs} label="Meta">
              <div style={styles.container}>
                <div style={styles.row}>
                  <TextField
                    hintText={current_mi.get('original_filename')}
                    disabled={true}
                    floatingLabelText='Original Filename'
                    floatingLabelFixed={true}
                  />
                  <TextField
                    hintText={current_mi.get('origin_date')}
                    disabled={true}
                    floatingLabelText='Origin Date'
                    floatingLabelFixed={true}
                  />
                </div>
                <div style={styles.row}>
                  <TextField
                    hintText={current_mi.get('added_date')}
                    disabled={true}
                    floatingLabelText='Added Date'
                    floatingLabelFixed={true}
                  />
                  <TextField
                    hintText={current_mi.get('modified_date')}
                    disabled={true}
                    floatingLabelText='Modified Date'
                    floatingLabelFixed={true}
                  />
                </div>
                <div style={styles.row}>
                  <TextField
                    hintText={current_mi.get('file_size')}
                    disabled={true}
                    floatingLabelText='File Size'
                    floatingLabelFixed={true}
                  />
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </Dialog>
    </div>
  )
}
