# API Endpoints Documentation

## HOS Module - Họ (Family/Class)

### 1. Get All Họ (with search and pagination)
**Endpoint:** `GET /hos/all`

**Description:** Retrieve a list of all họ with optional search filters and pagination.

**Input Schema:**
```json
Query Parameters:
{
  "page": {
    "type": "integer",
    "optional": true,
    "example": 1,
    "description": "Page number for pagination (minimum: 1)"
  },
  "limit": {
    "type": "integer",
    "optional": true,
    "example": 10,
    "description": "Number of records per page (minimum: 1)"
  },
  "ten_khoa_hoc": {
    "type": "string",
    "optional": true,
    "example": "Họ A",
    "description": "Search by họ scientific name"
  },
  "ten_nganh_khoa_hoc": {
    "type": "string",
    "optional": true,
    "example": "Ngành B",
    "description": "Search by ngành scientific name"
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "Danh sách họ được tìm thấy"
  },
  "data": {
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "id": { "type": "integer", "example": 1 },
        "ten_khoa_hoc": { "type": "string", "example": "Họ A" },
        "ten_tieng_viet": { "type": "string", "example": "Tên tiếng Việt" },
        "mo_ta": { "type": "string", "example": "Mô tả" },
        "ten_nganh_khoa_hoc": { "type": "string", "example": "Ngành B" },
        "created_at": { "type": "date", "example": "2025-12-17T00:00:00Z" },
        "updated_at": { "type": "date", "example": "2025-12-17T00:00:00Z" }
      }
    }
  }
}
```

---

### 2. Get All Họ (with extended information)
**Endpoint:** `GET /hos/all-hos`

**Description:** Retrieve all họ with detailed information including related ngành and count of loài.

**Input Schema:**
```json
Query Parameters:
{
  "ten_khoa_hoc": {
    "type": "string",
    "optional": true,
    "example": "Họ A"
  },
  "ten_nganh_khoa_hoc": {
    "type": "string",
    "optional": true,
    "example": "Ngành B"
  },
  "page": {
    "type": "integer",
    "optional": true,
    "default": 1,
    "example": 1
  },
  "limit": {
    "type": "integer",
    "optional": true,
    "default": 10,
    "example": 10
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "Get all hos successfully"
  },
  "data": {
    "type": "object",
    "properties": {
      "hos": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "id": { "type": "integer" },
            "ten_khoa_hoc": { "type": "string" },
            "ten_tieng_viet": { "type": "string" },
            "ten_nganh_khoa_hoc": { "type": "string" },
            "nganh": {
              "type": "object",
              "properties": {
                "ten_khoa_hoc": { "type": "string" },
                "ten_tieng_viet": { "type": "string" }
              }
            },
            "loais_count": { "type": "integer", "example": 5 }
          }
        }
      },
      "total": { "type": "integer", "example": 20 },
      "pages": { "type": "integer", "example": 2 }
    }
  }
}
```

---

### 3. Get Họ by Scientific Name
**Endpoint:** `GET /hos/:ten_khoa_hoc`

**Description:** Retrieve a specific họ by its scientific name.

**Input Schema:**
```json
Path Parameter:
{
  "ten_khoa_hoc": {
    "type": "string",
    "example": "Họ A",
    "description": "Scientific name of the họ"
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "Họ được tìm thấy"
  },
  "data": {
    "type": "object",
    "properties": {
      "id": { "type": "integer" },
      "ten_khoa_hoc": { "type": "string" },
      "ten_tieng_viet": { "type": "string" },
      "mo_ta": { "type": "string" },
      "ten_nganh_khoa_hoc": { "type": "string" },
      "nganh": {
        "type": "object",
        "properties": {
          "ten_khoa_hoc": { "type": "string" },
          "ten_tieng_viet": { "type": "string" }
        }
      }
    }
  }
}
```

---

### 4. Get Họ by ID
**Endpoint:** `GET /hos/:id`

**Description:** Retrieve a specific họ by its numeric ID.

**Input Schema:**
```json
Path Parameter:
{
  "id": {
    "type": "integer",
    "example": 1,
    "description": "Numeric ID of the họ"
  }
}
```

**Output Schema:** Same as endpoint #3

---

### 5. Create Single Họ
**Endpoint:** `POST /hos`

**Description:** Create a new họ record.

**Input Schema:**
```json
{
  "ten_khoa_hoc": {
    "type": "string",
    "required": true,
    "example": "Họ Mới"
  },
  "ten_tieng_viet": {
    "type": "string",
    "optional": true,
    "example": "Họ Mới Tiếng Việt"
  },
  "mo_ta": {
    "type": "string",
    "optional": true,
    "example": "Mô tả chi tiết về họ"
  },
  "ten_nganh_khoa_hoc": {
    "type": "string",
    "required": true,
    "example": "Ngành B"
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "Họ đã được tạo thành công"
  },
  "data": {
    "type": "object",
    "properties": {
      "id": { "type": "integer", "example": 100 },
      "ten_khoa_hoc": { "type": "string" },
      "ten_tieng_viet": { "type": "string" },
      "mo_ta": { "type": "string" },
      "ten_nganh_khoa_hoc": { "type": "string" },
      "created_at": { "type": "date" },
      "updated_at": { "type": "date" }
    }
  }
}
```

---

### 6. Create Multiple Họ
**Endpoint:** `POST /hos/many`

**Description:** Create multiple họ records in a single request.

**Input Schema:**
```json
{
  "data": {
    "type": "array",
    "required": true,
    "items": {
      "type": "object",
      "properties": {
        "ten_khoa_hoc": {
          "type": "string",
          "required": true,
          "example": "Họ Mới 1"
        },
        "ten_tieng_viet": {
          "type": "string",
          "optional": true,
          "example": "Họ Mới 1 Tiếng Việt"
        },
        "mo_ta": {
          "type": "string",
          "optional": true,
          "example": "Mô tả"
        },
        "ten_nganh_khoa_hoc": {
          "type": "string",
          "required": true,
          "example": "Ngành B"
        }
      }
    },
    "example": [
      {
        "ten_khoa_hoc": "Họ 1",
        "ten_tieng_viet": "Họ Một",
        "ten_nganh_khoa_hoc": "Ngành B"
      },
      {
        "ten_khoa_hoc": "Họ 2",
        "ten_tieng_viet": "Họ Hai",
        "ten_nganh_khoa_hoc": "Ngành B"
      }
    ]
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "Họ đã được tạo thành công"
  },
  "data": {
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "id": { "type": "integer" },
        "ten_khoa_hoc": { "type": "string" },
        "ten_tieng_viet": { "type": "string" },
        "mo_ta": { "type": "string" },
        "ten_nganh_khoa_hoc": { "type": "string" },
        "created_at": { "type": "date" },
        "updated_at": { "type": "date" }
      }
    },
    "example": [
      {
        "id": 100,
        "ten_khoa_hoc": "Họ 1",
        "ten_tieng_viet": "Họ Một",
        "mo_ta": null,
        "ten_nganh_khoa_hoc": "Ngành B",
        "created_at": "2025-12-17T00:00:00Z",
        "updated_at": "2025-12-17T00:00:00Z"
      },
      {
        "id": 101,
        "ten_khoa_hoc": "Họ 2",
        "ten_tieng_viet": "Họ Hai",
        "mo_ta": null,
        "ten_nganh_khoa_hoc": "Ngành B",
        "created_at": "2025-12-17T00:00:00Z",
        "updated_at": "2025-12-17T00:00:00Z"
      }
    ]
  }
}
```

---

### 7. Update Họ
**Endpoint:** `PUT /hos/:id`

**Description:** Update an existing họ record.

**Input Schema:**
```json
Path Parameter:
{
  "id": {
    "type": "integer",
    "example": 1
  }
}

Body:
{
  "ten_khoa_hoc": {
    "type": "string",
    "optional": true,
    "example": "Họ Cập Nhật"
  },
  "ten_tieng_viet": {
    "type": "string",
    "optional": true,
    "example": "Họ Cập Nhật Tiếng Việt"
  },
  "mo_ta": {
    "type": "string",
    "optional": true,
    "example": "Mô tả cập nhật"
  },
  "ten_nganh_khoa_hoc": {
    "type": "string",
    "optional": true,
    "example": "Ngành C"
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "Họ đã được cập nhật thành công"
  },
  "data": {
    "type": "object",
    "properties": {
      "id": { "type": "integer" },
      "ten_khoa_hoc": { "type": "string" },
      "ten_tieng_viet": { "type": "string" },
      "mo_ta": { "type": "string" },
      "ten_nganh_khoa_hoc": { "type": "string" },
      "updated_at": { "type": "date" }
    }
  }
}
```

---

### 8. Delete Họ
**Endpoint:** `DELETE /hos/:id`

**Description:** Delete a họ record by ID.

**Input Schema:**
```json
Path Parameter:
{
  "id": {
    "type": "integer",
    "example": 1
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "Họ đã được xóa thành công"
  },
  "data": {
    "type": "object",
    "properties": {
      "id": { "type": "integer" },
      "ten_khoa_hoc": { "type": "string" },
      "ten_tieng_viet": { "type": "string" },
      "mo_ta": { "type": "string" },
      "ten_nganh_khoa_hoc": { "type": "string" }
    }
  }
}
```

---

## LOAIS Module - Loài (Species)

### 1. Get All Loài (with filters)
**Endpoint:** `GET /loais/all`

**Description:** Retrieve a list of all loài with optional search filters and pagination.

**Input Schema:**
```json
Query Parameters:
{
  "ten_khoa_hoc": {
    "type": "string",
    "optional": true,
    "example": "Loài A"
  },
  "ten_ho_khoa_hoc": {
    "type": "string",
    "optional": true,
    "example": "Họ B"
  },
  "ten_nganh_khoa_hoc": {
    "type": "string",
    "optional": true,
    "example": "Ngành C"
  },
  "vung_phan_bo_id": {
    "type": "integer",
    "optional": true,
    "example": 5
  },
  "page": {
    "type": "integer",
    "optional": true,
    "default": 1,
    "example": 1
  },
  "limit": {
    "type": "integer",
    "optional": true,
    "default": 10,
    "example": 10
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "Get all loais successfully"
  },
  "data": {
    "type": "object",
    "properties": {
      "loais": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "id": { "type": "integer" },
            "ten_khoa_hoc": { "type": "string" },
            "ten_tieng_viet": { "type": "string" },
            "ten_goi_khac": { "type": "string" },
            "ten_ho_khoa_hoc": { "type": "string" },
            "ten_nganh_khoa_hoc": { "type": "string" },
            "created_at": { "type": "date" },
            "updated_at": { "type": "date" },
            "ho": {
              "type": "object",
              "properties": {
                "ten_khoa_hoc": { "type": "string" },
                "ten_tieng_viet": { "type": "string" }
              }
            }
          }
        }
      },
      "total": { "type": "integer" },
      "pages": { "type": "integer" }
    }
  }
}
```

---

### 2. Get Loài by Scientific Name
**Endpoint:** `GET /loais/:ten_khoa_hoc`

**Description:** Retrieve a specific loài by its scientific name with full details.

**Input Schema:**
```json
Path Parameter:
{
  "ten_khoa_hoc": {
    "type": "string",
    "example": "Loài A"
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "Loài được tìm thấy"
  },
  "data": {
    "type": "object",
    "properties": {
      "id": { "type": "integer" },
      "ten_khoa_hoc": { "type": "string" },
      "ten_tieng_viet": { "type": "string" },
      "ten_goi_khac": { "type": "string" },
      "ten_ho_khoa_hoc": { "type": "string" },
      "ten_nganh_khoa_hoc": { "type": "string" },
      "created_at": { "type": "date" },
      "updated_at": { "type": "date" },
      "ho": { "type": "object" },
      "dac_diem_sinh_hoc": { "type": "array" },
      "cong_dung_va_thanh_phan_hoa_hoc": { "type": "array" },
      "khai_thac_va_che_bien": { "type": "array" },
      "vi_tri_dia_li": { "type": "array" },
      "hinh_anh": { "type": "array" }
    }
  }
}
```

---

### 3. Get Loài by ID
**Endpoint:** `GET /loais/:id`

**Description:** Retrieve a specific loài by its numeric ID with full details.

**Input Schema:**
```json
Path Parameter:
{
  "id": {
    "type": "integer",
    "example": 1
  }
}
```

**Output Schema:** Same as endpoint #2

---

### 4. Create Single Loài
**Endpoint:** `POST /loais`

**Description:** Create a new loài record.

**Input Schema:**
```json
{
  "ten_khoa_hoc": {
    "type": "string",
    "required": true,
    "example": "Loài Mới"
  },
  "ten_tieng_viet": {
    "type": "string",
    "optional": true,
    "example": "Loài Mới Tiếng Việt"
  },
  "ten_goi_khac": {
    "type": "string",
    "optional": true,
    "example": "Tên Gọi Khác"
  },
  "ten_ho_khoa_hoc": {
    "type": "string",
    "required": true,
    "example": "Họ B"
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "Loài đã được tạo thành công"
  },
  "data": {
    "type": "object",
    "properties": {
      "id": { "type": "integer" },
      "ten_khoa_hoc": { "type": "string" },
      "ten_tieng_viet": { "type": "string" },
      "ten_goi_khac": { "type": "string" },
      "ten_ho_khoa_hoc": { "type": "string" },
      "created_at": { "type": "date" },
      "updated_at": { "type": "date" }
    }
  }
}
```

---

### 5. Create Multiple Loài
**Endpoint:** `POST /loais/many`

**Description:** Create multiple loài records in a single request.

**Input Schema:**
```json
{
  "data": {
    "type": "array",
    "required": true,
    "items": {
      "type": "object",
      "properties": {
        "ten_khoa_hoc": {
          "type": "string",
          "required": true,
          "example": "Loài 1"
        },
        "ten_tieng_viet": {
          "type": "string",
          "optional": true,
          "example": "Loài Một"
        },
        "ten_goi_khac": {
          "type": "string",
          "optional": true,
          "example": "Tên Gọi"
        },
        "ten_ho_khoa_hoc": {
          "type": "string",
          "required": true,
          "example": "Họ B"
        }
      }
    },
    "example": [
      {
        "ten_khoa_hoc": "Loài 1",
        "ten_tieng_viet": "Loài Một",
        "ten_ho_khoa_hoc": "Họ B"
      },
      {
        "ten_khoa_hoc": "Loài 2",
        "ten_tieng_viet": "Loài Hai",
        "ten_ho_khoa_hoc": "Họ B"
      }
    ]
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "Loài đã được tạo thành công"
  },
  "data": {
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "id": { "type": "integer" },
        "ten_khoa_hoc": { "type": "string" },
        "ten_tieng_viet": { "type": "string" },
        "ten_goi_khac": { "type": "string" },
        "ten_ho_khoa_hoc": { "type": "string" },
        "created_at": { "type": "date" },
        "updated_at": { "type": "date" }
      }
    }
  }
}
```

---

### 6. Update Loài
**Endpoint:** `PUT /loais/:id`

**Description:** Update an existing loài record.

**Input Schema:**
```json
Path Parameter:
{
  "id": {
    "type": "integer",
    "example": 1
  }
}

Body:
{
  "ten_khoa_hoc": {
    "type": "string",
    "optional": true,
    "example": "Loài Cập Nhật"
  },
  "ten_tieng_viet": {
    "type": "string",
    "optional": true,
    "example": "Loài Cập Nhật Tiếng Việt"
  },
  "ten_goi_khac": {
    "type": "string",
    "optional": true,
    "example": "Tên Gọi Cập Nhật"
  },
  "ten_ho_khoa_hoc": {
    "type": "string",
    "optional": true,
    "example": "Họ C"
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "Loài đã được cập nhật thành công"
  },
  "data": {
    "type": "object",
    "properties": {
      "id": { "type": "integer" },
      "ten_khoa_hoc": { "type": "string" },
      "ten_tieng_viet": { "type": "string" },
      "ten_goi_khac": { "type": "string" },
      "ten_ho_khoa_hoc": { "type": "string" },
      "updated_at": { "type": "date" }
    }
  }
}
```

---

### 7. Delete Loài
**Endpoint:** `DELETE /loais/:id`

**Description:** Delete a loài record by ID.

**Input Schema:**
```json
Path Parameter:
{
  "id": {
    "type": "integer",
    "example": 1
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "Loài đã được xóa thành công"
  },
  "data": {
    "type": "object",
    "properties": {
      "id": { "type": "integer" },
      "ten_khoa_hoc": { "type": "string" },
      "ten_tieng_viet": { "type": "string" },
      "ten_goi_khac": { "type": "string" },
      "ten_ho_khoa_hoc": { "type": "string" }
    }
  }
}
```

---

## NGANHS Module - Ngành (Branch/Department)

### 1. Get All Ngành (with extended info)
**Endpoint:** `GET /nganhs/all-nganhs`

**Description:** Retrieve all ngành with detailed information including count of related họ.

**Input Schema:**
```json
Query Parameters:
{
  "ten_khoa_hoc": {
    "type": "string",
    "optional": true,
    "example": "Ngành A"
  },
  "page": {
    "type": "integer",
    "optional": true,
    "default": 1,
    "example": 1
  },
  "limit": {
    "type": "integer",
    "optional": true,
    "default": 10,
    "example": 10
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "Get all nganhs successfully"
  },
  "data": {
    "type": "object",
    "properties": {
      "nganhs": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "id": { "type": "integer" },
            "ten_khoa_hoc": { "type": "string" },
            "ten_tieng_viet": { "type": "string" },
            "mo_ta": { "type": "string" },
            "created_at": { "type": "date" },
            "updated_at": { "type": "date" },
            "hos_count": { "type": "integer", "example": 10 }
          }
        }
      },
      "total": { "type": "integer" },
      "pages": { "type": "integer" }
    }
  }
}
```

---

### 2. Get Ngành by Scientific Name
**Endpoint:** `GET /nganhs/:ten_khoa_hoc`

**Description:** Retrieve a specific ngành by its scientific name.

**Input Schema:**
```json
Path Parameter:
{
  "ten_khoa_hoc": {
    "type": "string",
    "example": "Ngành A"
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "Ngành được tìm thấy"
  },
  "data": {
    "type": "object",
    "properties": {
      "id": { "type": "integer" },
      "ten_khoa_hoc": { "type": "string" },
      "ten_tieng_viet": { "type": "string" },
      "mo_ta": { "type": "string" },
      "created_at": { "type": "date" },
      "updated_at": { "type": "date" }
    }
  }
}
```

---

### 3. Get Ngành by ID
**Endpoint:** `GET /nganhs/:id`

**Description:** Retrieve a specific ngành by its numeric ID.

**Input Schema:**
```json
Path Parameter:
{
  "id": {
    "type": "integer",
    "example": 1
  }
}
```

**Output Schema:** Same as endpoint #2

---

### 4. Create Single Ngành
**Endpoint:** `POST /nganhs`

**Description:** Create a new ngành record.

**Input Schema:**
```json
{
  "ten_khoa_hoc": {
    "type": "string",
    "required": true,
    "example": "Ngành Mới"
  },
  "ten_tieng_viet": {
    "type": "string",
    "optional": true,
    "example": "Ngành Mới Tiếng Việt"
  },
  "mo_ta": {
    "type": "string",
    "optional": true,
    "example": "Mô tả chi tiết về ngành"
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "Ngành đã được tạo thành công"
  },
  "data": {
    "type": "object",
    "properties": {
      "id": { "type": "integer" },
      "ten_khoa_hoc": { "type": "string" },
      "ten_tieng_viet": { "type": "string" },
      "mo_ta": { "type": "string" },
      "created_at": { "type": "date" },
      "updated_at": { "type": "date" }
    }
  }
}
```

---

### 5. Create Multiple Ngành
**Endpoint:** `POST /nganhs/many`

**Description:** Create multiple ngành records in a single request.

**Input Schema:**
```json
{
  "data": {
    "type": "array",
    "required": true,
    "items": {
      "type": "object",
      "properties": {
        "ten_khoa_hoc": {
          "type": "string",
          "required": true,
          "example": "Ngành 1"
        },
        "ten_tieng_viet": {
          "type": "string",
          "optional": true,
          "example": "Ngành Một"
        },
        "mo_ta": {
          "type": "string",
          "optional": true,
          "example": "Mô tả"
        }
      }
    },
    "example": [
      {
        "ten_khoa_hoc": "Ngành 1",
        "ten_tieng_viet": "Ngành Một"
      },
      {
        "ten_khoa_hoc": "Ngành 2",
        "ten_tieng_viet": "Ngành Hai"
      }
    ]
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "Ngành đã được tạo thành công"
  },
  "data": {
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "id": { "type": "integer" },
        "ten_khoa_hoc": { "type": "string" },
        "ten_tieng_viet": { "type": "string" },
        "mo_ta": { "type": "string" },
        "created_at": { "type": "date" },
        "updated_at": { "type": "date" }
      }
    }
  }
}
```

---

### 6. Update Ngành
**Endpoint:** `PUT /nganhs/:id`

**Description:** Update an existing ngành record.

**Input Schema:**
```json
Path Parameter:
{
  "id": {
    "type": "integer",
    "example": 1
  }
}

Body:
{
  "ten_khoa_hoc": {
    "type": "string",
    "optional": true,
    "example": "Ngành Cập Nhật"
  },
  "ten_tieng_viet": {
    "type": "string",
    "optional": true,
    "example": "Ngành Cập Nhật Tiếng Việt"
  },
  "mo_ta": {
    "type": "string",
    "optional": true,
    "example": "Mô tả cập nhật"
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "Ngành đã được cập nhật thành công"
  },
  "data": {
    "type": "object",
    "properties": {
      "id": { "type": "integer" },
      "ten_khoa_hoc": { "type": "string" },
      "ten_tieng_viet": { "type": "string" },
      "mo_ta": { "type": "string" },
      "updated_at": { "type": "date" }
    }
  }
}
```

---

### 7. Delete Ngành
**Endpoint:** `DELETE /nganhs/:id`

**Description:** Delete a ngành record by ID.

**Input Schema:**
```json
Path Parameter:
{
  "id": {
    "type": "integer",
    "example": 1
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "Ngành đã được xóa thành công"
  },
  "data": {
    "type": "object",
    "properties": {
      "id": { "type": "integer" },
      "ten_khoa_hoc": { "type": "string" },
      "ten_tieng_viet": { "type": "string" },
      "mo_ta": { "type": "string" }
    }
  }
}
```

---

## USERS Module - User Management

### 1. Create User
**Endpoint:** `POST /users/user`

**Description:** Create a new user account.

**Input Schema:**
```json
{
  "full_name": {
    "type": "string",
    "required": true,
    "example": "Nguyễn Văn A"
  },
  "email": {
    "type": "email",
    "required": true,
    "example": "user@example.com"
  },
  "password": {
    "type": "string",
    "required": true,
    "example": "password123",
    "description": "Will be hashed before storage"
  },
  "role": {
    "type": "enum",
    "required": true,
    "enum_values": ["ADMIN", "USER", "MODERATOR"],
    "example": "USER"
  },
  "address": {
    "type": "string",
    "optional": true,
    "example": "123 Street, City"
  },
  "date_of_birth": {
    "type": "date",
    "optional": true,
    "example": "1990-01-15"
  },
  "gender": {
    "type": "enum",
    "optional": true,
    "enum_values": ["Male", "Female", "Other"],
    "example": "Male"
  },
  "avatar": {
    "type": "string",
    "optional": true,
    "example": "https://example.com/avatar.jpg"
  },
  "status": {
    "type": "enum",
    "default": "ACTIVE",
    "enum_values": ["ACTIVE", "INACTIVE"],
    "example": "ACTIVE"
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "User được tạo mới thành công"
  },
  "data": {
    "type": "object",
    "properties": {
      "id": { "type": "integer", "example": 1 },
      "full_name": { "type": "string" },
      "email": { "type": "string" },
      "role": { "type": "string" },
      "address": { "type": "string" },
      "date_of_birth": { "type": "date" },
      "gender": { "type": "string" },
      "avatar": { "type": "string" },
      "status": { "type": "string" },
      "created_at": { "type": "date" },
      "updated_at": { "type": "date" }
    }
  }
}
```

---

### 2. Create Multiple Users
**Endpoint:** `POST /users/user/many`

**Description:** Create multiple user accounts in a single request.

**Input Schema:**
```json
{
  "data": {
    "type": "array",
    "required": true,
    "items": {
      "type": "object",
      "properties": {
        "full_name": {
          "type": "string",
          "required": true,
          "example": "User 1"
        },
        "email": {
          "type": "email",
          "required": true,
          "example": "user1@example.com"
        },
        "password": {
          "type": "string",
          "required": true,
          "example": "password123"
        },
        "role": {
          "type": "enum",
          "required": true,
          "enum_values": ["ADMIN", "USER", "MODERATOR"],
          "example": "USER"
        },
        "address": {
          "type": "string",
          "optional": true,
          "example": "Address 1"
        },
        "date_of_birth": {
          "type": "date",
          "optional": true,
          "example": "1990-01-15"
        },
        "gender": {
          "type": "enum",
          "optional": true,
          "enum_values": ["Male", "Female", "Other"]
        },
        "avatar": {
          "type": "string",
          "optional": true
        },
        "status": {
          "type": "enum",
          "default": "ACTIVE",
          "enum_values": ["ACTIVE", "INACTIVE"]
        }
      }
    },
    "example": [
      {
        "full_name": "User 1",
        "email": "user1@example.com",
        "password": "pass123",
        "role": "USER"
      },
      {
        "full_name": "User 2",
        "email": "user2@example.com",
        "password": "pass456",
        "role": "USER"
      }
    ]
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "Users được tạo mới thành công"
  },
  "data": {
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "id": { "type": "integer" },
        "full_name": { "type": "string" },
        "email": { "type": "string" },
        "role": { "type": "string" },
        "status": { "type": "string" },
        "created_at": { "type": "date" },
        "updated_at": { "type": "date" }
      }
    }
  }
}
```

---

### 3. User Login
**Endpoint:** `POST /users/login`

**Description:** Authenticate user with email and password.

**Input Schema:**
```json
{
  "email": {
    "type": "email",
    "required": true,
    "example": "user@example.com"
  },
  "password": {
    "type": "string",
    "required": true,
    "example": "password123"
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "User đăng nhập thành công"
  },
  "data": {
    "type": "object",
    "properties": {
      "id": { "type": "integer" },
      "full_name": { "type": "string" },
      "email": { "type": "string" },
      "role": { "type": "string" },
      "status": { "type": "string" },
      "created_at": { "type": "date" },
      "updated_at": { "type": "date" }
    }
  }
}
```

---

### 4. Forgot Password
**Endpoint:** `POST /users/forgot-password`

**Description:** Request password reset by sending verification code to email.

**Input Schema:**
```json
{
  "email": {
    "type": "email",
    "required": true,
    "example": "user@example.com"
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "Email reset password được gửi thành công"
  },
  "data": {
    "type": "object",
    "properties": {
      "verificationCode": {
        "type": "object",
        "properties": {
          "id": { "type": "integer" },
          "user_id": { "type": "integer" },
          "code": { "type": "string", "description": "6-digit code" },
          "purpose": { "type": "string", "example": "PASSWORD_RESET" },
          "expires_at": { "type": "date" },
          "created_at": { "type": "date" }
        }
      },
      "emailResponse": {
        "type": "object",
        "properties": {
          "id": { "type": "string", "description": "Email service response ID" },
          "from": { "type": "string", "example": "noreply@example.com" },
          "to": { "type": "string" }
        }
      }
    }
  }
}
```

---

### 5. Verify Code
**Endpoint:** `POST /users/verify-code`

**Description:** Verify a verification code for password reset or email confirmation.

**Input Schema:**
```json
{
  "user_id": {
    "type": "integer",
    "required": true,
    "example": 1
  },
  "verification_code": {
    "type": "string",
    "required": true,
    "example": "123456",
    "description": "6-digit code"
  },
  "purpose": {
    "type": "enum",
    "required": true,
    "enum_values": ["PASSWORD_RESET", "EMAIL_VERIFICATION"],
    "example": "PASSWORD_RESET"
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "Reset password thành công"
  },
  "data": {
    "type": "object",
    "properties": {
      "id": { "type": "integer" },
      "full_name": { "type": "string" },
      "email": { "type": "string" },
      "role": { "type": "string" },
      "status": { "type": "string" },
      "updated_at": { "type": "date" }
    }
  }
}
```

---

### 6. Update User
**Endpoint:** `PUT /users/user/:id`

**Description:** Update user profile information.

**Input Schema:**
```json
Path Parameter:
{
  "id": {
    "type": "integer",
    "example": 1
  }
}

Body:
{
  "full_name": {
    "type": "string",
    "optional": true,
    "example": "Nguyễn Văn B"
  },
  "email": {
    "type": "email",
    "optional": true,
    "example": "newemail@example.com"
  },
  "old_password": {
    "type": "string",
    "optional": true,
    "example": "oldpass123",
    "description": "Required if changing password"
  },
  "new_password": {
    "type": "string",
    "optional": true,
    "example": "newpass123"
  },
  "role": {
    "type": "enum",
    "optional": true,
    "enum_values": ["ADMIN", "USER", "MODERATOR"]
  },
  "address": {
    "type": "string",
    "optional": true,
    "example": "456 Street, City"
  },
  "date_of_birth": {
    "type": "date",
    "optional": true
  },
  "gender": {
    "type": "enum",
    "optional": true,
    "enum_values": ["Male", "Female", "Other"]
  },
  "avatar": {
    "type": "string",
    "optional": true
  },
  "status": {
    "type": "enum",
    "optional": true,
    "enum_values": ["ACTIVE", "INACTIVE"]
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "User được cập nhật thành công"
  },
  "data": {
    "type": "object",
    "properties": {
      "id": { "type": "integer" },
      "full_name": { "type": "string" },
      "email": { "type": "string" },
      "role": { "type": "string" },
      "address": { "type": "string" },
      "avatar": { "type": "string" },
      "status": { "type": "string" },
      "updated_at": { "type": "date" }
    }
  }
}
```

---

### 7. Get All Users
**Endpoint:** `GET /users/user`

**Description:** Retrieve all users with optional pagination and filters.

**Input Schema:**
```json
Query Parameters:
{
  "page": {
    "type": "integer",
    "optional": true,
    "example": 1
  },
  "limit": {
    "type": "integer",
    "optional": true,
    "example": 10
  },
  "role": {
    "type": "string",
    "optional": true,
    "example": "USER"
  },
  "status": {
    "type": "string",
    "optional": true,
    "example": "ACTIVE"
  }
}
```

**Output Schema:**
```json
{
  "message": {
    "type": "string",
    "example": "get all users successfully"
  },
  "data": {
    "type": "object",
    "properties": {
      "allUser": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "id": { "type": "integer" },
            "full_name": { "type": "string" },
            "email": { "type": "string" },
            "role": { "type": "string" },
            "address": { "type": "string" },
            "gender": { "type": "string" },
            "avatar": { "type": "string" },
            "status": { "type": "string" },
            "created_at": { "type": "date" },
            "updated_at": { "type": "date" }
          }
        }
      },
      "total": { "type": "integer", "example": 50 },
      "n_pages": { "type": "integer", "example": 5 }
    }
  }
}
```

---

## Summary of All Endpoints

### HOS Module (8 endpoints)
- `GET /hos/all` - Get all họ with search
- `GET /hos/all-hos` - Get all họ with extended info
- `GET /hos/:ten_khoa_hoc` - Get họ by scientific name
- `GET /hos/:id` - Get họ by ID
- `POST /hos` - Create single họ
- `POST /hos/many` - Create multiple họ
- `PUT /hos/:id` - Update họ
- `DELETE /hos/:id` - Delete họ

### LOAIS Module (7 endpoints)
- `GET /loais/all` - Get all loài with filters
- `GET /loais/:ten_khoa_hoc` - Get loài by scientific name
- `GET /loais/:id` - Get loài by ID
- `POST /loais` - Create single loài
- `POST /loais/many` - Create multiple loài
- `PUT /loais/:id` - Update loài
- `DELETE /loais/:id` - Delete loài

### NGANHS Module (7 endpoints)
- `GET /nganhs/all-nganhs` - Get all ngành with extended info
- `GET /nganhs/:ten_khoa_hoc` - Get ngành by scientific name
- `GET /nganhs/:id` - Get ngành by ID
- `POST /nganhs` - Create single ngành
- `POST /nganhs/many` - Create multiple ngành
- `PUT /nganhs/:id` - Update ngành
- `DELETE /nganhs/:id` - Delete ngành

### USERS Module (7 endpoints)
- `POST /users/user` - Create user
- `POST /users/user/many` - Create multiple users
- `POST /users/login` - User login
- `POST /users/forgot-password` - Request password reset
- `POST /users/verify-code` - Verify code
- `PUT /users/user/:id` - Update user
- `GET /users/user` - Get all users

**Total: 29 API Endpoints**
