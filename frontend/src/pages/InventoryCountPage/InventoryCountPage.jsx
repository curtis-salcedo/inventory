import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Data Imports
import { DataContext } from '../../utilities/DataContext';

// Component Imports
import InventorySheet from '../../components/InventorySheet/InventorySheet';

// Styling Imports
import {
  Card,
} from 'reactstrap';

export default function InventoryCountPage({}) {
  return (
    <InventorySheet />
  )
}