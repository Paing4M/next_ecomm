import {NextRequest, NextResponse} from "next/server";
import {v4 as uuid4} from 'uuid'
import {writeFile} from "node:fs/promises";
import path from "node:path";
import * as fs from "node:fs";


export const POST = async (req: Request) => {
  const formData = await req.formData()
  const file = formData.get('image') as File

  if (file) {
    const _id = uuid4()
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const fileName = `${_id}-${file.name}`
    const filePath = path.join(process.cwd(), 'public', 'images', 'products', fileName)
    await writeFile(filePath, buffer)
    return NextResponse.json({
      message: `Successfully uploaded ${fileName} image`,
      name: fileName
    }, {status: 200})

  } else {
    return NextResponse.json({
      'message': 'File not found.'
    }, {status: 400})
  }


}


export const DELETE = async (req: Request) => {

  const data = await req.formData()
  const name = data.get('name') as string

  if (!name) {
    return NextResponse.json({
      'message': 'Image not found.'
    }, {status: 400})
  }

  const filePath = path.join(process.cwd(), 'public', 'images', 'products', name)
  fs.unlink(filePath, (err) => {
    if (err) {
      return NextResponse.json({
        'message': 'Image delete failed. Please try again later.'
      }, {status: 400})
    }
  })

  return NextResponse.json({
    'message': 'Successfully deleted image.',
  }, {status: 200})

}