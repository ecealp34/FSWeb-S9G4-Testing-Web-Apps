import React from 'react';
import { getByLabelText, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import IletisimFormu from './IletisimFormu';



test('hata olmadan render ediliyor', () => {
render(<IletisimFormu/>);
});

test('iletişim formu headerı render ediliyor', () => {
render(<IletisimFormu/>);
const titleValue = screen.getByText('İletişim Formu')
expect(titleValue).toBeInTheDocument()
});

test('kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
    render(<IletisimFormu/>);
    const nameInput = screen.getByLabelText("Ad*")
    userEvent.type(nameInput, "test")
    await waitFor(() => {
    expect(screen.queryAllByTestId("error").length).toBe(1)    
    expect(screen.queryByText('Hata: ad en az 5 karakter olmalıdır.')).toBeInTheDocument();
    })

});

test('kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.', async () => {
    render(<IletisimFormu/>);
    const gönderInput = screen.getByText("Gönder")
    userEvent.click(gönderInput)
    await waitFor(() => {
    const variable = screen.getAllByTestId("error");
    expect(variable.length).toBe(3)    
    
    })
});

test('kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {
    render(<IletisimFormu/>);
    const nameInput = screen.getByLabelText("Ad*")
    userEvent.type(nameInput, "test1")
    const surnameInput = screen.getByLabelText("Soyad*")
    userEvent.type(surnameInput, "test3")
    userEvent.click(screen.getByText("Gönder"))
    await waitFor(() => {
    expect(screen.queryAllByTestId("error").length).toBe(1)    
    
    })

});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
     render(<IletisimFormu/>);
    
     userEvent.type(screen.queryAllByPlaceholderText("yüzyılıngolcüsü@hotmail.com"), "test4")
     const surnameInput = screen.getByLabelText("Soyad*")
     userEvent.type(surnameInput, "test3")
     userEvent.click(screen.getByText("Gönder"))
     await waitFor(() => {
     expect(screen.queryByText("Hata: email geçerli bir email adresi olmalıdır.")).toBeInTheDocument()    
    
     })
});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
    render(<IletisimFormu/>);
    userEvent.type(screen.getByLabelText("Ad*"), "test1")
    userEvent.type(screen.queryByPlaceholderText("yüzyılıngolcüsü@hotmail.com"), "test@gmail.com")
    userEvent.type(screen.queryByLabelText("Mesaj"), "test5")
    userEvent.click(screen.getByText("Gönder"))
    await waitFor(() => {
    expect(screen.queryByText("Hata: soyad gereklidir.")).toBeInTheDocument();
    
    })
});

test('ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {
    render(<IletisimFormu/>);
    userEvent.type(screen.getByLabelText("Ad*"), "test1")
    const surnameInput = screen.getByLabelText("Soyad*")
    userEvent.type(surnameInput, "test3")
    userEvent.type(screen.queryByPlaceholderText("yüzyılıngolcüsü@hotmail.com"), "test@gmail.com")
    userEvent.click(screen.getByText("Gönder"))
    await waitFor(() => {
    expect(screen.queryAllByTestId("error").length).toBe(0);   
   
    })
});

test('form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {
     render(<IletisimFormu/>);
     userEvent.type(screen.getByLabelText("Ad*"), "test1")
     const surnameInput = screen.getByLabelText("Soyad*")
     userEvent.type(surnameInput, "test3")
     userEvent.type(screen.queryByPlaceholderText("yüzyılıngolcüsü@hotmail.com"), "test@gmail.com")
     userEvent.type(screen.getByLabelText("Mesaj"), "test5")
     userEvent.click(screen.getByText("Gönder"))
     await waitFor(() => {
     expect(screen.queryByTestId("firstnameDisplay").textContent).toBe(`Ad: ${test1}`);    
     expect(screen.queryByTestId("lastnameDisplay").textContent).toBe(`Soyad: ${test3}`);
     expect(screen.queryByTestId("emailDisplay").textContent).toBe(`Email: ${"test@gmail.com"}`); 
     expect(screen.queryByTestId("messageDisplay").textContent).toBe("Mesaj: ${test5}");  
    
     })
});
