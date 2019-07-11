import mongoose from 'mongoose';

export class DbConnector {
  public static connect = async (options: any) => {
    const url = options.url;
    delete options.url;

    mongoose.connect(url, options)
    .then(() => {
      // tslint:disable-next-line:no-console
      console.log('MongoDB connected...');
    })
    .catch((error: Error) => {
      // tslint:disable-next-line:no-console
      console.log(error);
    });
  }
}

// const baseURL = `mongodb://${dbUri}:${dbPort}/vsadmindb`;
