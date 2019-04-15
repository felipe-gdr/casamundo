package com.casamundo.bean;

import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.activation.MimetypesFileTypeMap;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class UploadFiles {

    Commons_DB commons_db = new Commons_DB();

    public ResponseEntity uploadFiles(String image, MongoClient mongo) {
        String folder = "c:/images/casamundo/";
        BasicDBObject doc = commons_db.obterCrudDoc("setup", "documento.setupKey", "fotosCasamundo", mongo);
        folder = doc.getString("setupValue");
        File target = new File(folder + image);
        if (!target.exists()) {
            System.out.println("imagem inexistente:" + folder + image);
//            throw new WebApplicationException(404);
        }
        String mt = new MimetypesFileTypeMap().getContentType(target);
        return ResponseEntity.ok().contentType(MediaType.valueOf(mt)).body(target);
    }
    public ResponseEntity uploadFile(MultipartFile input, String prefix, MongoClient mongo) {

        String folder = "c:/images/casamundo/";
        BasicDBObject doc = commons_db.obterCrudDoc("setup", "documento.setupKey", "fotosCasamundo", mongo);
        folder = doc.getString("setupValue");
        String fileName = prefix + "_" + StringUtils.cleanPath(input.getOriginalFilename());

        try {
            try (InputStream inputStream = input.getInputStream()) {
                Files.copy(inputStream, Paths.get(folder + fileName),
                        StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro inesperado ao salvar arquivo");
        }

        return ResponseEntity.ok()
                .body("uploadFile is called, Uploaded file name : " + fileName);
    }
}
