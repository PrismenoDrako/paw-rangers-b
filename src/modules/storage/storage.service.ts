import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

/**
 * Servicio genérico para manejar archivos en S3/MinIO.
 * Permite subir, eliminar y generar URLs de archivos para distintos módulos.
 */
@Injectable()
export class StorageService {
  private s3: S3;
  private bucket: string;

  constructor() {
    this.bucket = process.env.MINIO_BUCKET || 'paw-rangers-files';
    this.s3 = new S3({
      endpoint: process.env.AWS_ENDPOINT || 'http://localhost:9000',
      s3ForcePathStyle: true,
      accessKeyId: process.env.MINIO_ROOT_USER,
      secretAccessKey: process.env.MINIO_ROOT_PASSWORD,
    });
  }

  /**
   * Sube un archivo a un folder específico dentro del bucket.
   * @param file Archivo en formato Express.Multer.File
   * @param folder Carpeta donde se almacenará (ej. pets, avatars, reports)
   * @returns URL pública del archivo subido
   */
  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const key = `${folder}/${uuid()}-${file.originalname}`;

    await this.s3.putObject({
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read', // público para desarrollo
    }).promise();

    return `${process.env.AWS_ENDPOINT || 'http://localhost:9000'}/${this.bucket}/${key}`;
  }

  /**
   * Elimina un archivo del bucket.
   * @param key Clave completa del archivo en el bucket (folder/nombreArchivo)
   */
  async deleteFile(key: string): Promise<void> {
    await this.s3.deleteObject({ Bucket: this.bucket, Key: key }).promise();
  }

  /**
   * Genera la URL pública de un archivo existente en el bucket.
   * @param key Clave completa del archivo en el bucket
   */
  getFileUrl(key: string): string {
    return `${process.env.AWS_ENDPOINT || 'http://localhost:9000'}/${this.bucket}/${key}`;
  }
}