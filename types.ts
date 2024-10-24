

export type SmsMessageType = {
    _id: number;
    thread_id: number;
    address: string;
    date: number;
    date_sent: number;
    protocol: number;
    read: number;
    status: number;
    type: number;
    reply_path_present: number;
    body: string;
    service_center: string;
    locked: number;
    error_code: number;
    sub_id: number;
    creator: string;
    seen: number;
    deletable: number;
    sim_slot: number;
    sim_imsi: string;
    hidden: number;
    app_id: number;
    msg_id: number;
    reserved: number;
    pri: number;
    teleservice_id: number;
    svc_cmd: number;
    roam_pending: number;
    spam_report: number;
    secret_mode: number;
    safe_message: number;
    favorite: number;
  };