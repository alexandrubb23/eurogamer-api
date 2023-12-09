import { HttpService } from '@nestjs/axios';
import { HttpException } from '@nestjs/common';
import { AxiosError } from '@nestjs/terminus/dist/errors/axios.error';
import { XMLParser } from 'fast-xml-parser';
import { catchError, firstValueFrom, Observable } from 'rxjs';

export interface FetchResponse<T> {
  rss: {
    channel: {
      title: string;
      link: string;
      description: string;
      'atom:link': string;
      language: string;
      lastBuildDate: string;
      item: T[];
    };
  };
}

const xmlParser = new XMLParser();

export class RSSAPIClient<T> {
  constructor(
    private readonly endpoint: string,
    private readonly httpService: HttpService,
  ) {
    this.endpoint = endpoint;
  }

  public getAll = async (): Promise<FetchResponse<T>> => {
    const response = await this.firstValueFromSource(
      this.httpService.get<FetchResponse<T>>(this.endpoint),
    );

    const xmlData = JSON.stringify(response.data);
    return xmlParser.parse(xmlData);
  };

  public getOne = async (id: string): Promise<string> => {
    const response = await this.firstValueFromSource(
      this.httpService.get<string>(id),
    );

    return response.data;
  };

  private firstValueFromSource = <T>(source: Observable<T>) => {
    return firstValueFrom(source.pipe(catchError(this.handleError)));
  };

  private handleError = (error: AxiosError) => {
    const { statusText, status } = error.response;
    const statusCode = parseInt(status);

    const response: Record<string, number | string> = {
      status: statusCode,
      message: statusText,
    };

    throw new HttpException(response, statusCode);
  };
}
