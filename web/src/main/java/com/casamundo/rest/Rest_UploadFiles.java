package com.casamundo.rest;

import com.casamundo.bean.UploadFiles;
import com.casamundo.dao.Commons_DB;
import com.mongodb.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.activation.MimetypesFileTypeMap;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.UnknownHostException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;

@RestController
@RequestMapping("/upload")
public class Rest_UploadFiles {
    /**
     * Procura a imagem pelo seu nome e devolve como resposta.
     *
     * @param image nome da imagem a procurar
     * @return imagem com o mime type da imagem fonte.
     * @author magician
     * <p>
     * Devolve a imagem com o mime type do ficheiro ou 404 caso
     * o ficheiro n�o seja encontrada.
     */

     Commons_DB commons_db = new Commons_DB();
     UploadFiles uploadFiles = new UploadFiles();
    @SuppressWarnings("rawtypes")
    @GetMapping(value = "/images", produces = "image/*")
    public ResponseEntity getImage(@PathVariable("image") String image) throws UnknownHostException {

        MongoClient mongo = commons_db.getMongoClient();
        ResponseEntity response = uploadFiles.uploadFiles(image, mongo);
        mongo.close();
        return response;
    }


    @SuppressWarnings("rawtypes")
    @PostMapping(value = "/files", consumes = "multipart/form-data")
    public ResponseEntity uploadFile(@RequestParam MultipartFile input, @PathVariable("prefix") String prefix) throws UnknownHostException {
        MongoClient mongo = commons_db.getMongoClient();
        ResponseEntity response = uploadFiles.uploadFile(input, prefix, mongo);
        mongo.close();
        return response;
    }
}
