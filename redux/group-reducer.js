import {createSlice} from '@reduxjs/toolkit';
import {multiGetParcelTrackings} from "../api/parcel.js";
import {editShipGroup} from "../api/shipGroup.js";


const initialState = {
  groups: [],
  shipments: [],
};


const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
      updateGroups: (state, action) => {
        state.groups = action.payload;
      },
      updateGroupById: (state, action) => {
        const {id, group} = action.payload;
        const index = state.groups.findIndex((group) => group.id === id);
        if (index !== -1) {
          state.groups[index] = group;
        } else {
          state.groups.push(group);
        }
      },
      updateShipments: (state, action) => {
        state.shipments = action.payload;
      },
      updateShipmentById: (state, action) => {
        const {id, shipment} = action.payload;
        const index = state.shipments.findIndex((shipment) => shipment.id === id);
        if (index !== -1) {
          state.shipments[index] = shipment;
        } else {
          state.shipments.push(shipment);
        }
      },
    }
  }
)

export const {
  updateGroups,
  updateGroupById,
  updateShipments,
  updateShipmentById
} = groupSlice.actions;

export default groupSlice.reducer;
