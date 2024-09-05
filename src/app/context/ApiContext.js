/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import useFetchData from "../hooks/useFetchData";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";

const DashboardContext = createContext();

const Provider = ({ children }) => {
  /*==============================================================
    -------------------/ Code Product /---------------------------
  ================================================================*/

  const [products, setProducts] = useState([]);

  // ----------------------/ Get products /-----------------------
  const {
    data: productsData,
    loading: productsLoading,
    errMsg: productsErrMsg,
  } = useFetchData("http://localhost:4000/products");

  // استخدم useEffect لتحديث المنتجات عند تغير productsData
  useEffect(() => {
    if (productsData) setProducts(productsData);
  }, [productsData]);

  const [users, setUsers] = useState([]);

  // ----------------------------/ Add New Product /----------------------------
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });

  const addProduct = useCallback(async () => {
    const response = await fetch("http://localhost:4000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    const data = await response.json();

    // حفظ البيانات داخل ال state => Products
    setProducts((prevProducts) => [...prevProducts, data]);
    // لخزف البيانات داخل ال input
    setNewProduct({ title: "", price: "", description: "", image: "" });
  }, [newProduct]);

  // ----/ Delete Product /-----
  const deleteProduct = useCallback(async (id) => {
    await fetch(`http://localhost:4000/products/${id}`, {
      method: "DELETE",
    });

    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );

    handleCloseModal();
  }, []);

  // ---------------------- / Add To Cart /----------------------------
  const [cart, setCart] = useState([]);
  const quantityCart = cart.length;
  const [totalPrice, setTotalPrice] = useState(0);
  const [showSnackbarCart, setShowSnackbarCart] = useState(false); //! في خطاء هنا السناك بار مش بيظهر

  const addCart = useCallback(
    (productItem) => {
      const isProductInCart = cart.some(
        (cartItem) => cartItem.id === productItem.id
      );

      // لو ال id مش موجود في ال cart  ضيف الطلب الي ال cart
      if (!isProductInCart) {
        const today = new Date();
        const orderDate = `${today.getDate()}/${
          today.getMonth() + 1
        }/${today.getFullYear()}`;

        const productWithOrderDate = { ...productItem, orderDate }; // اضافه التاريخ

        setCart((prevCart) => [...prevCart, productWithOrderDate]); // اضافه المنتج الي ال cart
      }

      setShowSnackbarCart(true); //! في خطاء هنا السناك بار مش بيظهر

      setTimeout(() => {
        setShowSnackbarCart(false);
      }, 3000);
    },
    [cart]
  );

  // Calculate total price
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += Number(item.price);
    });
    setTotalPrice(total);
  }, [cart]);

  // Delete Item from Cart
  const deleteItemCart = useCallback((id) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id));
  }, []);

  // ---------------------- / My Favorite Products /----------------------------
  const [favProduct, setFavProduct] = useState([]);

  // استخدام useEffect لتحميل المفضلات من localStorage عند تحميل المكون
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteProducts");
    if (savedFavorites) {
      setFavProduct(JSON.parse(savedFavorites));
    }
  }, []); // سيتم تنفيذ هذا الuseEffect مرة واحدة عند تحميل المكون

  // دالة لإضافة منتج إلى المفضلات
  const addMyFavorite = useCallback(
    (id) => {
      // العثور على المنتج الذي سيتم إضافته
      const productFav = productsData.find((item) => item.id === id);

      // التحقق مما إذا كان المنتج موجودًا بالفعل في المفضلات
      const isProductInFav = favProduct.some((favItem) => favItem.id === id);

      if (!isProductInFav && productFav) {
        // تأكد من وجود المنتج قبل إضافته
        // تحديث قائمة المفضلات وإضافة المنتج الجديد
        const updatedFavProduct = [...favProduct, productFav];
        setFavProduct(updatedFavProduct);

        // تحديث localStorage فقط إذا كان هناك تغييرات فعلية
        localStorage.setItem(
          "favoriteProducts",
          JSON.stringify(updatedFavProduct)
        );
      }
    },
    [favProduct, productsData] // إضافة التبعيات المطلوبة
  );

  // Delete Item From Favorites
  const deleteItemFromFavorites = useCallback(
    (id) => {
      // فلترة العناصر لإزالة العنصر الذي يطابق الـ id المحدد
      const updatedFavProducts = favProduct.filter((item) => item.id !== id);

      // تحديث حالة العناصر المفضلة
      setFavProduct(updatedFavProducts);

      // تحديث localStorage فقط إذا كان هناك تغييرات في العناصر
      if (
        JSON.stringify(updatedFavProducts) !==
        localStorage.getItem("favoriteProducts")
      ) {
        localStorage.setItem(
          "favoriteProducts",
          JSON.stringify(updatedFavProducts)
        );
      }
    },
    [favProduct, setFavProduct]
  );

  // ---------------------- / Search /----------------------------
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  /*==============================================================
    ---------------------/ Code Users /---------------------------
  ================================================================*/

  // ---------------------- / Get User / ----------------------
  const {
    data: usersData,
    loading: usersLoading,
    errMsg: usersErrMsg,
  } = useFetchData("http://localhost:4000/users");

  // استخدم useEffect لتحديث المستخدمين عند تغير usersData
  useEffect(() => {
    if (usersData) setUsers(usersData);
  }, [usersData]);

  // ----------------------------/ Add New User /----------------------------
  // انشاء id لل user
  const generateUserId = () => {
    const timestamp = new Date().getTime();
    return timestamp.toString().slice(-6);
  };
  const [newUser, setNewUser] = useState({
    id: generateUserId(),
    username: "",
    email: "",
    password: "",
    purchases: [],
  });

  // ---/ Add new User /---
  const addUser = useCallback(async () => {
    // التحقق من عدم تكرار ال Email
    const emailExists = users.some((user) => user.email === newUser.email);

    if (emailExists) {
      alert("The email already exists go and log in");
    } else {
      const userToAdd = {
        ...newUser,
        id: generateUserId(), // توليد id جديد لكل مستخدم
        purchases: [], // التأكد من أن المشتريات فارغة
      };

      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userToAdd),
      });

      const data = await response.json();
      alert("signup successfully");
      setUsers((prevUsers) => [...prevUsers, data]); // تحديث ال user state
      setNewUser({
        id: generateUserId(), // توليد id جديد للحساب الجديد
        username: "",
        email: "",
        password: "",
        purchases: [],
      }); // حزف البيانات داخل ال input
    }
  }, [newUser, users]);
  // -------------------/ Delete User /-------------------
  const deleteUser = useCallback(async (id) => {
    await fetch(`http://localhost:4000/users/${id}`, { method: "DELETE" });
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

    handleCloseModal();
  }, []);

  // --------------- / Login User Account && check User Account /---------------
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lastLoginTime, setLastLoginTime] = useState(null);
  const [isLoadingLoding, setIsLoadingLoding] = useState(false);
  const router = useRouter();

  const [checkUser, setCheckUser] = useState({
    email: "",
    password: "",
  });

  // ----/ checkUserAcc /----
  const checkUserAcc = useCallback(async () => {
    const user = users.find((user) => user.email === checkUser.email);

    if (user) {
      const match = await bcrypt.compare(checkUser.password, user.password);

      if (match) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        const loginTime = new Date().toString();
        localStorage.setItem("loginTime", loginTime);

        // setCurrentUser({ ...user, id: user.id });
        setCurrentUser({ ...user });

        setIsLoggedIn(true);
        setIsLoadingLoding(true);
        setLastLoginTime(formatLoginTime(loginTime));

        setTimeout(() => {
          setIsLoadingLoding(false);
          router.push("/");
          setCheckUser({ email: "", password: "" });
        }, 500);

        return true;
      } else {
        alert("Login failed. Please check your email and password.");
        setIsLoggedIn(false);
        return false;
      }
    } else {
      alert("Login failed. Please check your email and password.");
      setIsLoggedIn(false);
      return false;
    }
  }, [checkUser, users, router]);

  // ----------------/ show login time /----------------
  const formatLoginTime = useCallback((loginTime) => {
    const options = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(loginTime).toLocaleString(undefined, options);
  }, []);

  // -------------------/ LogOut User in Account /------------------------
  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCart([]);
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("loginTime");
  }, []);

  // ----------------/ Show User Account in My Profile /-----------------
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const loginTime = localStorage.getItem("loginTime");

    if (loggedInUser && loginTime) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(loggedInUser));
      setLastLoginTime(formatLoginTime(loginTime));
    }
  }, [formatLoginTime]);

  // ---------------------------/ Git With login data user  /---------------------------
  const [userProduct, setUserProduct] = useState([]);
  const userIdLog = currentUser ? currentUser.id : null;

  const { data: productsUserDataOrder } = useFetchData(
    userIdLog ? `http://localhost:4000/users/${userIdLog}` : ""
  );

  // عند حدوث تغيير علي productsUserDataOrder
  useEffect(() => {
    if (productsUserDataOrder) {
      setUserProduct(productsUserDataOrder.purchases);
    }
  }, [productsUserDataOrder]);

  // ---------------------------/ Add purchased products to the profile /---------------------------
  const updateUserProduct = async () => {
    // تحويل المشتريات الحالية إلى كائن يستخدم الـ id كمفتاح
    const currentPurchasesMap = new Map(
      productsUserDataOrder.purchases.map((item) => [item.id, item])
    );

    // تصفية عناصر السلة وإضافة العناصر الجديدة فقط
    const newCartItems = cart.filter(
      (item) => !currentPurchasesMap.has(item.id)
    );

    // دمج المشتريات الحالية مع العناصر الجديدة من السلة
    const updatedPurchases = [
      ...productsUserDataOrder.purchases,
      ...newCartItems,
    ];

    const updatedUser = { purchases: updatedPurchases };

    try {
      const response = await fetch(
        `http://localhost:4000/users/${currentUser?.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        }
      );

      // تحقق من حالة الاستجابة
      if (response.ok) {
        // تحديث حالة userProduct مع المشتريات الجديدة
        setUserProduct(updatedPurchases);
      } else {
        // قراءة بيانات الخطأ من الاستجابة
        const errorData = await response.json();
        console.error("فشل تحديث البيانات:", errorData);
      }
    } catch (error) {
      // معالجة الأخطاء في حال حدوث مشكلة أثناء العملية
      console.error("خطأ في تحديث المستخدم:", error);
    }
  };

  // ---------------------- / Show Modal /----------------------------
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [showModalDeleteProduct, setShowModalDeleteProduct] = useState(false);
  const [showModalAddProduct, setshowModalAddProduct] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setShowModalDeleteProduct(false);
    setShowModalDeleteUser(false);
    setshowModalAddProduct(false);
  }, []);

  // --------------------------------
  const [myProfilePage, setMyProfilePage] = useState("account");

  // Switch My Profile page between account and purchases
  const switchMyProfilePage = useCallback((page) => {
    setMyProfilePage(page);
  }, []);

  // ---------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------------
  return (
    <DashboardContext.Provider
      value={{
        //--/ products /--
        products,
        setProducts,
        newProduct,
        setNewProduct,
        addProduct,
        deleteProduct,
        cart,
        setCart,
        addCart,
        deleteItemCart,
        quantityCart,
        totalPrice,
        favProduct,
        addMyFavorite,
        deleteItemFromFavorites,
        productsLoading,
        productsErrMsg,
        showSnackbarCart,
        // Filter
        setSearch,
        setPriceFilter,
        search,
        priceFilter,

        //--/ Users /--
        users,
        setUsers,
        newUser,
        setNewUser,
        addUser,
        deleteUser,
        setCheckUser,
        checkUserAcc,
        checkUser,
        currentUser,
        handleLogout,
        isLoggedIn,
        myProfilePage,
        usersErrMsg,
        setCurrentUser,
        usersLoading,
        lastLoginTime,
        userProduct,
        productsUserDataOrder,
        updateUserProduct,
        isLoadingLoding,

        // modal
        showModal,
        setShowModal,
        setShowModalDeleteUser,

        showModalAddProduct,
        setshowModalAddProduct,
        handleCloseModal,
        switchMyProfilePage,
        showModalDeleteUser,
        setShowModalDeleteProduct,
        showModalDeleteProduct,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export { Provider, DashboardContext };
