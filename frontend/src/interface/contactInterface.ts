export type IContact = {
  title: string;
  subTitle: string;
  email: string;
  phone: string;
  address: string;
  googleMapLink?: string;
  whatsappLink: string;
  messengerLink?: string;
  socials: {
    icon: string;
    url: string;
  }[];
};
