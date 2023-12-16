/* eslint-disable no-useless-catch */
import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";

export class Service{
    client = new Client();
    database;
    bucket;

    constructor() {
        this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
      this.database = new Databases(this.client)
    }
    async createPost({title,slug,content,featuredImage,status,userId}) {
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
                
            )
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, {title,content,featuredImage,status}) {
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true
        } catch (error) {
            console.log("Appwrite service : : deletePost : : error", error);
            return false
        }
            
        }

        async getPost(slug) {
            try {
                return await this.database.getDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,
                )
            } catch (error) {
                throw error;
            }
        }

        async getPosts(queries = [Query.equal("status","active")]) {
            try {
                return await this.database.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    queries,
                    
                )
            } catch (error) {
                throw error;
            }
        }

        // file upload services
        async uploadFile(file) {
            try {
                return await this.bucket.createFile(
                    conf.appwriteBucketId,
                    ID.unique(),
                    file,
                )
            } catch (error) {
                throw error;
            }
        }

        async deleteFile(fileId) {
            try {
                 await this.bucket.deleteFile(
                    conf.appwriteBucketId,
                    fileId,
                    )
                    return true
            } catch (error) {
                throw error;
            }
        }

        getFilePreview(fileId) {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        }
        
    }

   


const service = new Service();
export default service;
