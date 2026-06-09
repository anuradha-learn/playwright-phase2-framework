// ─────────────────────────────────────────────
// Data types — match Excel and CSV column headers exactly
// ─────────────────────────────────────────────

export type AddressData={
    firstName:string;
    lastName:string;
    street: string;
    city: string;
    country: string;
}

export type SearchData = {
    keyword: string;
    maxPrice: string;
};