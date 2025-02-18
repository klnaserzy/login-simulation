import { defineStore } from "pinia";
import { ref } from "vue";
import { mockapiUrl } from "../api/api";

const mockapiData = [
    {
        id: 0,
        name: "yellow",
        account: "yellow",
        password: "abc"
    },
    {
      id: 1,
      name: "a",
      account: "abc",
      password: "def"
    },
    {
      id: 2,
      name: "b",
      account: "ghi",
      password: "jkl"
    },
    {
      id: 3,
      name: "c",
      account: "mno",
      password: "pqr"
    },
    {
      id: 4,
      name: "d",
      account: "stu",
      password: "vwx"
    },
    {
      id: 5,
      name: "e",
      account: "yza",
      password: "bcd"
    },
    {
      id: 6,
      name: "f",
      account: "efg",
      password: "hij"
    },
    {
      id: 7,
      name: "g",
      account: "klm",
      password: "nop"
    },
    {
      id: 8,
      name: "h",
      account: "qrs",
      password: "tuv"
    },
    {
      id: 9,
      name: "i",
      account: "wxy",
      password: "zab"
    },
    {
      id: 10,
      name: "j",
      account: "cde",
      password: "fgh"
    }
  ]  // 未取得mockapi的代替資料

const mockBackEndData = ref('');

// 從mockapi取得資料 用來模擬後端資料
const getMockApiData = async () => {
    try {
        const response = await fetch(mockapiUrl, { method: 'GET' });
        
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await response.json();
        
        // 未能取得資料會返回字串 Not found
        if(data === 'Not found'){
            // 結果為Not found時 先用預設的資料
            mockBackEndData.value = mockapiData;
            console.log('not found!!!')
        }
        else {
            mockBackEndData.value = data;
            console.log('found!!!')
        }
        console.log(data)
    } catch(err) {
        console.error(err);
        // 產生錯誤 未能取得資料時 用來代替的資料
        mockBackEndData.value = mockapiData;
        console.log('後端資料代替 mockBackEndData: ', mockBackEndData.value)
    }
}

getMockApiData();

export const useAuthStore = defineStore("auth", () => {
  
    const isLoggedIn = ref(false);  // 用戶是否已登入
    const user = ref({
        id: '',
        name: '',
        account: ''
    })  // 用戶資訊
    const accountExisted = ref(false);
    const createAccountSuccess = ref(false);
        
    const login = async (userData) => {
        // 登入
        // try {
        //     const response = await fetch('https://example.com/user/login', {
        //         method: "POST",
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             account: userData.account,
        //             password: userData.password
        //         })
        //     })
            
        //     if(!response.ok) {
        //         if(response.status === 401) {
        //             throw new Error('帳號或密碼錯誤')
        //         } else if(response.status === 500) {
        //             throw new Error('伺服器錯誤，請稍後再試')
        //         } else {
        //             throw new Error(`發生錯誤 ${response.status}`)
        //         }
        //     }
            
        //     const data = await response.json();

        //     localStorage.setItem('token', data.userToken);  // 儲存 JWT
        //     localStorage.setItem('user', JSON.stringify(data.userData));  // 儲存使用者資訊

        //     isLoggedIn.value = true;
        //     user.value = data.userData;
        // } catch(err) {
        //     console.error("登入失敗:", error.message);
        // }
        //////////////////////////////////////
        
        // 驗證帳號
        const verifyUser = mockBackEndData.value.find(data => {
            return data.account === userData.account && data.password === userData.password
        })

        if(verifyUser){
            user.value = verifyUser;
            console.log(user.value)
            localStorage.setItem('user', JSON.stringify(verifyUser))
            localStorage.setItem('token', 'faker token')
            isLoggedIn.value = true;
        }

    }

    // 登出
    const logout = () => {
        isLoggedIn.value = false;
        user.value = {
            id: '',
            name: '',
            account: ''
        };
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    // 檢查登入狀態
    const checkLoginStatus = () => {
        // 模擬檢查本地 Token 是否存在
        const token = localStorage.getItem("token");
        if (token) {
            isLoggedIn.value = true;
            user.value = JSON.parse(localStorage.getItem('user'));  // 模擬從 Token 中解析用戶資訊
            console.log('welcome', user.value )
        }
    }

    // 註冊帳號
    const register = async (user) => {
        // try {
        //     const response = await fetch('https://example.com/user', {
        //         method: "POST",
        //         headers: {
        //             'Content-Type': 'application/JSON'
        //         },
        //         body: JSON.stringify(user)
        //     })

        //     if(!response.ok) {
        //         // 409 衝突 已有帳號存在
        //         res.status === 409 ? 
        //             accountExisted.value = true :
        //             throw new Error(`Error: ${res.status} - ${res.statusText}`)
                
        //         return ;  // 停止執行
        //     }
        
        //     const data = await response.json();
        //     login(user);
        // } catch (err) {
        //     console.log('Network or server error:', err)
        // }

        // 檢查是否已存在帳號
        const accountExist = mockBackEndData.value.find(data => {
            return data.account === user.account
        })

        // 返回存在帳號為true 
        if(accountExist) {
            accountExisted.value = true ;
            // 停止執行
            return ;
        };

        let setId = -1;
        let currentId = 0;

        // 尋找未使用的id 模擬用沒有使用UUID
        while(setId === -1) {
            const idExists = mockBackEndData.value.some(data => data.id === currentId)

            if(!idExists) setId = currentId;

            currentId++;
        }

        // 添加新帳號
        mockBackEndData.value.push({
            id: setId,
            name: user.name,
            account: user.account,
            password: user.password
        })

        createAccountSuccess.value = true;
        console.log(mockBackEndData.value)
    }

    // 修改使用者資料
    const modifyInformation = async (modifyData) => {
        // try {
        //     const response = await fetch(`https://example.com/${user.value.id}`, {
        //             method: 'PATCH',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Authorization': `Bear ${put_user_api_key}`
        //             },
        //             body: JSON.stringify(modifyData)
        //         })

        //     if(!response.ok) {
        //         throw new Error(`HTTP error! status: ${response.status}`)
        //     }

        //     // 如果 response status 為 204 No Content，則不做 JSON 解析
        //     let data = null;
        //     if (response.status !== 204) {
        //         data = await response.json();
        //     }

        //     user.value.name = modifyData.name
        //     console.log('Updated data:', data);
        // } catch(err) {
        //     console.log('Err: ', err)
        // }

        mockBackEndData.value = mockBackEndData.value.map(data => {
            data.name = data.id === user.value.id ? modifyData.name : data.name ;
            return data;
        })
        console.log(mockBackEndData.value);
        alert('修改成功 可在開發者工具檢查(不保存修改資料)')
    }

    return {
        isLoggedIn,
        user,
        mockBackEndData,
        accountExisted,
        createAccountSuccess,
        register,
        login,
        logout,
        checkLoginStatus,
        modifyInformation,
    }
});