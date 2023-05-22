export interface C0001 {
  id:         string ,
  deviceId:   string ,
  deviceType: string ,
  data:       C0001Data,
}
export interface C0001Data {
  state:     boolean,
  intensity: number
}
