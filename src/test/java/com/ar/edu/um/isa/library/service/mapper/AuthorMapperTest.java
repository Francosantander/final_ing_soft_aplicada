package com.ar.edu.um.isa.library.service.mapper;


import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import com.ar.edu.um.isa.library.domain.Author;
import com.ar.edu.um.isa.library.service.dto.AuthorDTO;

class AuthorMapperTest {
    private AuthorMapper authorMapper;
    @BeforeEach
    public void setUp() {
        authorMapper = new AuthorMapperImpl();
    }

    @Test
    public void testNullAuthorToEntity() {
        Author author = authorMapper.toEntity((AuthorDTO) null);

        assertNull(author);
    }

    @Test
    public void testAuthorToEntity() {
        AuthorDTO dto = new AuthorDTO(null, "test author");

        Author author = authorMapper.toEntity(dto);

        assertNotNull(author);
        assertEquals("test author", author.getFirstName());
    }

    @Test
    public void testPartialUpdate() {
        Author author = new Author();
        AuthorDTO dto = new AuthorDTO(null, "updated name");
        authorMapper.partialUpdate(author, dto);

        assertEquals(author.getFirstName(), "updated name");
    }
}
