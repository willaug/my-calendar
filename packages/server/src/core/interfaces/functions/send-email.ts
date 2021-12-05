export interface SendEmail {
  fromEmail: string;
  toEmail: string;
  title: string;
  template: SendEmailTemplateDate;
}

export interface SendEmailTemplateDate {
  path: string;
  variables: any;
}
