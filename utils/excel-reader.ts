import * as XLSX from 'xlsx'
import path from 'path'

export function readExcel<T>(fileName:string):T[]{

    // Build absolute path to data file

    const filePath= path.join(__dirname, '..', 'data', fileName);

    // Read the workbook from disk
    const workbook=XLSX.readFile(filePath)

    // Use the first Sheet
    const sheetName=workbook.SheetNames[0]
    const sheet=workbook.Sheets[sheetName]

    // Convert sheet rows to array of objects
    const data=XLSX.utils.sheet_to_json<T>(sheet)

    console.log(`Read ${data.length} rows from ${fileName}`);

    return data

}