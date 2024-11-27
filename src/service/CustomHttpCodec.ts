import {HttpUrlEncodingCodec} from "@angular/common/http";

export class CustomHttpParamEncoder extends HttpUrlEncodingCodec {
  encodeValue(value: string): string {
    return encodeURIComponent(value)
  }
}
