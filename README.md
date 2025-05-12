## API Documentacion

### Use case: Registrar un socio

```
POST /members
REQUEST
{
    name: string
}
RESPONSE
{
    id: int
}
```

### Use case: Recibir un libro

```
POST /loans
REQUEST
{
    memberId: int,
    bookId: int
}
```

### Use case: Devolver un libro

```
PUT /loans
REQUEST
{
    bookId: int
}
RESPONSE
{
    cancelad: 'int' | 'delayed' #TBD
}
```

tengo carpeta server con carpetas controllers, models, routes y en raiz db.js y index.js

### Use case: Lstar los prestamos y filtrar por socio

```
GET /loans?memberId=member_id&active_loans=bool
REQUEST
{
    me: int
}
RESPONSE
{
    loans: [
        {
            returnDate: datetime,
            loanDate: datetime,
            deadline: datetime,
            bookTitle: string
        }
    ]
}
```

### Obener prestamo por libro

### Agrupar por SBN

### Descontar o aumentar stock

1.Cliente!
2.Consulta SQL para obtener rankin de socios con mayor cantidad de prestamos
3.Implementar Swagger para documentar (y probar) la API
4.Explorar Jest pata testear la API
