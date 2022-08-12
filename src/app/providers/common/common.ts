export const Common = {
  PUSH_TOKEN: 'push_token',
  AUTO_LOGIN: 'auto_login',
  USER: 'app.user',
  SIGN_UP: 'sign_up',
  PARAMS: 'params',
  STAT_PARAMS: 'stat_params',
  VIDEO: 'video',
  NAVIGATION_EXTRA: 'navigation_extra',
  LANG: 'locale.lang',
  LIGHT: 'material-light',
  DARK: 'material-dark',
  THEME: 'app.theme',
  REGISTER_USER: 'register.user',
  LOGIN_USER: 'login.user',
  URI: 'app.uri',
  TENANTS: 'app.tenants',
  TENANT_ID: 'app.tenantId',
  CONTACT: 'contact',
  CANCEL_LEAVE: 'cancel_leave',
  LEVEL_UP: 'level_up',
  VERIFICATION: 'verification',
  VERIFICATION_KEY: 'verification_key',
  SIGNUP_KEY: 'sign_up_key',
  FIND_ID: 'find_id',
  FIND_PW: 'find_pw',
  CHANGE_PW: 'change_pw',
  ADDRESS: 'address',
  SET_STORE: 'set_store',
  CHANGE_MOBILE: 'change_mobile',
  ORDER: 'order',
  GOODS: 'goods',
  MODIFY: 'modify',
  TERMS: 'terms',
  PUSH_DATA: 'push_data',
  CONFIG: 'config',
  ATTACHMENT: 'attachment',
  LEAVE: 'leave',
  ORDER_COMPLETE: 'order_complete',
  ORDER_CANCEL: 'order_cancel',
  PAGE: 'page',
  PAGE_IMAGE_LIST: 'page_image_list',
  PAGE_BG_LIST: 'page_bg_list',
  NO_MENU_REGISTER_ALERT: 'no_menu_register_alert',
  SALES_LIST: 'sales_list',
  PLUS_LIST: 'plus_list',
};

export class OpenTime {
  pageSeqNo: number;
  startTime: string;
  endTime: string;
  nextDay: boolean = false;
  type: number;

  constructor() {}
}
