const dummy = (blogs) => {
     return 1
  }
  
const totalLikes = array => {
   return  array.reduce((sum,item) => sum + item.likes,0)

} 

const favBlog = array => {
    const maxLikes = Math.max(...array.map(item => item.likes))
    return array.find(item => item.likes === maxLikes)
}

const mostBlog = array => {
      const blogObject = {}
   
    array.forEach(item => {
        if(blogObject[item.author]) blogObject[item.author] += 1
          else blogObject[item.author] = 1
    })
    return  Object.entries(blogObject)
           .map(item => ({author:item[0],blog:item[1]}))
           .sort((a,b) => b.blog - a.blog)[0]
}
 const mostLikes = array => {
     const blogObject = {}
     array.forEach(item => {
            if(blogObject[item.author]) blogObject[item.author] += item.likes
            else blogObject[item.author] = item.likes
     })
     return Object.entries(blogObject)
                   .map(item => ({author:item[0],likes:item[1]}))
                   .sort((a,b) => b.likes - a.likes)[0]
 }

  module.exports = {
    dummy,
    totalLikes,
    favBlog,
    mostBlog,
    mostLikes
  }