export type SearchResult = {
  age: number;
  breed: string;
  id: string;
  img: string;
  name: string;
  zip_code: string;
};


export type LogoutProps = {
  name: string;
  email: string;
};

export type favoriteResults = {
  age: number;
  breed: string;
  id: string;
  img: string;
  name: string;
  zip_code: string;
}

export type queryParamProps = {
  breeds?: string,
  ageMin?: number,
  ageMax?: number,
};