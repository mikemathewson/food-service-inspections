export type Facility = {
  id: string;
  operation_id: string;
  name: string;
  violations: number;
  warnings: number;
  address: string;
  city: string;
  zip_code: string;
};

export type Inspection = {
  id: string;
  facility: string;
  operation_id: string;
  date: string;
  description: string;
  type: string;
  violation_item: string;
  violations: number;
  warnings: number;
  address: string;
  city: string;
  zip_code: string;
};

/*export type ActiveInspectionApiResult = {
  facility: string;
  address: string;
  date_of_inspection: string;
  violation_item: string;
  violation_description: string;
  critical_violation: string;
  total_critical_violations: string;
  total_crit_not_corrected: string;
  total_noncritical_violations: string;
  local_health_department: string;
  county: string;
  facility_code: string;
  facility_address: string;
  facility_city: string;
  facility_postal_zipcode: string;
  nysdoh_gazetteer_1980: string;
  facility_municipality: string;
  operation_name: string;
  permit_expiration_date: string;
  food_service_type: string;
  food_service_description: string;
  permitted_corp_name: string;
  perm_operator_last_name: string;
  perm_operator_first_name: string;
  nys_health_operation_id: string;
  inspection_type: string;
  fs_facility_state: string;
  latitude: string;
  longitude: string;
};*/
