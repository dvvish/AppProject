import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  VendorList: undefined; // No parameters expected for VendorList
  VendorDetails: { vendorId: string }; // VendorDetails expects a vendorId parameter
};
