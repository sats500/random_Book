let Books=[
    {id:1,title:'5am club'},
    {id:2,title:'Good vibes,good life'},
    {id:3,title:'On the way to krisna'},
    {id:4,title:'Subtle art'}
];
let lastId=4;

module.exports={
    findAll(){
        return Books;
    },
    findOne(id){
        return Books.find(Books=>Books.id==id);
    },
    create(book){
        const id=++lastId;
       const newbook=({
        id,
        title:book.title
       });
       Books.push(newbook);
       return newbook;
    },
    update(id,book){
      const existbook=Books.find(book=>book.id===id);
      if(!existbook){
        return null;
      }
      const updatebook={
        ...existbook,
        ...book
      };
      Books=Books.map(book=>{
        if(book.id==id){
            return updatebook;
        }
        return book;
      });
      return updatebook;
    },
    destroy(id){
      Books=Books.filter(book=>book.id!==id);
      return id;
    }
};
