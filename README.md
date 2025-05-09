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

### Use case: Lstar los prestamos y filtrar por socio

```
GET /loans?memberId=member_id
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
