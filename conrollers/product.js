const Product = require("../model/product");

const getAllProduct = async (req, res) =>{
    const {company, name, featured, sort, select} = req.query;
    const queryObject = {};
    if(company){
        queryObject.company = company;
        console.log(queryObject.company)
    }
    if(name){
        queryObject.name = {$regex : name, $options : "i"};
        console.log(queryObject.name)
    }
    if(featured){
        queryObject.featured = featured;
        console.log(featured);
    }
    let apidata  =  Product.find(queryObject);

    if(sort){
        let sortFix = sort.split(",").join(" ");
        apidata = apidata.select(sortFix);
    }
    if(select){
        let selectFix = select.split(",").join(" ");
        apidata = apidata.select(selectFix);
    }
   // pagination, we are limiting the number of limit and pages to pe shown
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;
     let skip = (page - 1) * limit;

     apidata = apidata.skip(skip).limit(limit);
    const Products  =await apidata;
    res.status(200).json({Products, nbHits: myData.length});
};

const getAllProductTesting = async (req, res) =>{
    const myData  =await Product.find(req.query);

    res.status(200).json({myData});
};

module.exports = {getAllProduct, getAllProductTesting};