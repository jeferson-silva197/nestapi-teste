import { FindByZipCodeHandler } from './addresses/find-by-cep.handler';
import { FindbyDocumentHandler } from './customer/find-by-document.handler';
import { FindAllDocumentsHandler } from './customer/get-all.handler';

export const QueryHandlers = [
  FindbyDocumentHandler,
  FindAllDocumentsHandler,
  FindByZipCodeHandler,
];
