package com.casamundo.rest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.UnknownHostException;

import javax.activation.MimetypesFileTypeMap;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.Mongo;

@RestController
@RequestMapping("/upload")
public class Rest_UploadFiles {
	/**
	 * Procura a imagem pelo seu nome e devolve como resposta.
	 * @author magician
	 *
     * Devolve a imagem com o mime type do ficheiro ou 404 caso
     * o ficheiro n�o seja encontrada.
     * @param image nome da imagem a procurar
     * @return imagem com o mime type da imagem fonte.
     */
	@SuppressWarnings("rawtypes")
	@GetMapping(value = "/images", produces = "image/*")
    public ResponseEntity getImage(@PathVariable("image") String image){

		String folder = "c:/images/casamundo/";
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("setup");
			BasicDBObject searchQuery = new BasicDBObject("documento.setupKey", "fotosCasamundo");
			DBObject cursor = collection.findOne(searchQuery);
			if (cursor != null){
				BasicDBObject obj = (BasicDBObject) cursor.get("documento");
				folder = obj.getString("setupValue");
			};
			mongo.close();
		} catch (UnknownHostException e) {
			e.printStackTrace();
		};
        
		File target = new File(folder + image);
        if(!target.exists()){
        	System.out.println("imagem inexistente:" + folder + image);
//            throw new WebApplicationException(404);
        }
        String mt = new MimetypesFileTypeMap().getContentType(target);

        return ResponseEntity.ok().contentType(MediaType.valueOf(mt)).body(target);
    };

	// TODO: implementar upload, no estilo Spring boot (https://spring.io/guides/gs/uploading-files/)
	@SuppressWarnings("rawtypes")
	@PostMapping(value = "/files", consumes = "multipart/form-data")
	public ResponseEntity uploadFile(MultipartFile input, @PathVariable("prefix") String prefix) {
//		String folder = "c:/images/casamundo/";
//		Mongo mongo;
//		try {
//			mongo = new Mongo();
//			DB db = (DB) mongo.getDB("documento");
//			DBCollection collection = db.getCollection("setup");
//			BasicDBObject searchQuery = new BasicDBObject("documento.setupKey", "fotosCasamundo");
//			DBObject cursor = collection.findOne(searchQuery);
//			if (cursor != null){
//				BasicDBObject obj = (BasicDBObject) cursor.get("documento");
//				folder = obj.getString("setupValue");
//			};
//			mongo.close();
//		} catch (UnknownHostException e) {
//			e.printStackTrace();
//		};
//		String fileName = "";
//		Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
//		List<InputPart> inputParts = uploadForm.get("uploadedFile");
//
//		for (InputPart inputPart : inputParts) {
//			try {
//
//				MultivaluedMap<String, String> header = inputPart.getHeaders();
//				fileName = prefix + "_" + getFileName(header);
//
//				//convert the 	uploaded file to inputstream
//				InputStream inputStream = inputPart.getBody(InputStream.class,null);
//
//				byte [] bytes = IOUtils.toByteArray(inputStream);
//
//				//constructs upload file path
//				fileName = folder + fileName;
//
//				writeFile(bytes,fileName);
//
//				System.out.println("Done");
//
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//
//		}
//
//		return Response.status(200)
//				.entity("uploadFile is called, Uploaded file name : " + fileName).build();


        return ResponseEntity.noContent().build();
	}

	/**
	 * header sample
	 * {
	 * 		Content-Type=[image/png], 
	 * 		Content-Disposition=[form-data; name="file"; filename="filename.extension"]
	 * }
	 **/
	//get uploaded filename, is there a easy way in RESTEasy?
//	private String getFileName(MultivaluedMap<String, String> header) {
//
//		String[] contentDisposition = header.getFirst("Content-Disposition").split(";");
//
//		for (String filename : contentDisposition) {
//			if ((filename.trim().startsWith("filename"))) {
//
//				String[] name = filename.split("=");
//
//				String finalFileName = name[1].trim().replaceAll("\"", "");
//				return finalFileName;
//			}
//		}
//		return "unknown";
//	}

	//save to somewhere
	private void writeFile(byte[] content, String filename) throws IOException {

		File file = new File(filename);

		if (!file.exists()) {
			file.createNewFile();
		}

		FileOutputStream fop = new FileOutputStream(file);

		fop.write(content);
		fop.flush();
		fop.close();

	};

}
