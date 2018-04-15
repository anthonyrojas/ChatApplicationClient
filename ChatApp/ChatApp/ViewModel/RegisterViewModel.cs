﻿using GalaSoft.MvvmLight;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GalaSoft.MvvmLight.Command;
using System.Windows.Input;
using System.Globalization;
using System.Text.RegularExpressions;
using Windows.UI.Popups;
using GalaSoft.MvvmLight.Views;
using Newtonsoft.Json;
using ChatApp.Model;
using System.Net.Http;

namespace ChatApp.ViewModel
{
    public class RegisterViewModel : ViewModelBase
    {
        private String phone;
        private String email;
        private String firstName;
        private String lastName;
        private String password;
        private String confirmPassword;
        private String confirmPasswordMessage;
        private String confirmPasswordMessageColor;
        private readonly INavigationService navigationService;
        public ICommand RegisterCommand { get; set; }
        private static ServerHttpClient client = new ServerHttpClient();
        public RegisterViewModel(INavigationService navService)
        {
            navigationService = navService;
            RegisterCommand = new RelayCommand(RegisterAction);
        }

        public String Phone
        {
            get { return phone; }
            set
            {
                phone = value;
                RaisePropertyChanged("Phone");
            }
        }

        public String Email
        {
            get { return email; }
            set
            {
                email = value;
                RaisePropertyChanged("Email");
            }
        }

        public String FirstName
        {
            get { return firstName; }
            set
            {
                firstName = value;
                RaisePropertyChanged("FirstName");
            }
        }

        public String LastName
        {
            get { return lastName; }
            set
            {
                lastName = value;
                RaisePropertyChanged("LastName");
            }
        }

        public String Password
        {
            get { return password; }
            set
            {
                password = value;
                RaisePropertyChanged("Password");
                if (!String.IsNullOrEmpty(confirmPassword) && password != confirmPassword)
                {
                    confirmPasswordMessage = "Passwords do not match!";
                    confirmPasswordMessageColor = "DarkRed";
                    RaisePropertyChanged("ConfirmPasswordMessage");
                    RaisePropertyChanged("ConfirmPasswordMessageColor");
                }
                else
                {
                    confirmPasswordMessage = null;
                    confirmPasswordMessageColor = null;
                    RaisePropertyChanged("ConfirmPasswordMessage");
                    RaisePropertyChanged("ConfirmPasswordMessageColor");
                }
            }
        }

        public String ConfirmPassword
        {
            get { return confirmPassword; }
            set
            {
                confirmPassword = value;
                RaisePropertyChanged("ConfirmPassword");
                if (!String.IsNullOrEmpty(confirmPassword) && !String.IsNullOrEmpty(password) && confirmPassword != password)
                {
                    confirmPasswordMessage = "Passwords do not match!";
                    confirmPasswordMessageColor = "DarkRed";
                    RaisePropertyChanged("ConfirmPasswordMessage");
                    RaisePropertyChanged("ConfirmPasswordMessageColor");
                }
                else
                {
                    confirmPasswordMessage = null;
                    confirmPasswordMessageColor = null;
                    RaisePropertyChanged("ConfirmPasswordMessage");
                    RaisePropertyChanged("ConfirmPasswordMessageColor");
                }
            }
        }

        public String ConfirmPasswordMessage
        {
            get { return confirmPasswordMessage; }
            set
            {
                confirmPasswordMessage = value;
                RaisePropertyChanged("ConfirmPasswordMessage");
            }
        }

        public String ConfirmPasswordMessageColor
        {
            get { return confirmPasswordMessageColor; }
            set
            {
                confirmPasswordMessageColor = value;
                RaisePropertyChanged("ConfirmPasswordMessageColor");
            }
        }

        private async void RegisterAction()
        {
            String errorMessage = "";
            if (String.IsNullOrEmpty(phone))
            {
                errorMessage += "You must enter a valid phone number.\n";
            }
            if (String.IsNullOrEmpty(firstName))
            {
                errorMessage += "You must enter a first name.\n";
            }
            if (String.IsNullOrEmpty(lastName))
            {
                errorMessage += "You must enter a last name.\n";
            }
            if (String.IsNullOrEmpty(email))
            {
                errorMessage += "You must enter a valid email.\n";
            }
            if (String.IsNullOrEmpty(password))
            {
                errorMessage += "You must enter a password.\n";
            }
            if (String.IsNullOrEmpty(confirmPassword))
            {
                errorMessage += "You must confirm your password.\n";
            }
            if (!String.IsNullOrEmpty(password) && !String.IsNullOrEmpty(confirmPassword) && confirmPassword != password)
            {
                errorMessage += "Your passwords do not match.\n";
            }

            if (!String.IsNullOrEmpty(errorMessage))
            {
                MessageDialog showDialog = new MessageDialog(errorMessage, "Error");
                showDialog.Commands.Add(new UICommand("Ok") { Id = 0 });
                showDialog.CancelCommandIndex = 0;
                await showDialog.ShowAsync();
            }
            else
            {
                MessageDialog showDialog = new MessageDialog("You have successfully registered!", "Success");
                showDialog.Commands.Add(new UICommand("Ok") { Id = 0 });
                showDialog.CancelCommandIndex = 0;
                await showDialog.ShowAsync();
                var info = new UserRegistrationInfo()
                {
                    phone = Phone,
                    email = Email,
                    firstName = FirstName,
                    lastName = LastName,
                    password = Password
                };
                string body = JsonConvert.SerializeObject(info);
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri("http://localhost:3000");
                try
                {
                    var response = client.PostAsJsonAsync("/api/register", info);
                    response.Wait();
                    var result = response.Result;
                }
                finally
                {
                    Console.WriteLine("Failure to register");
                }
                //var response = await client.CreateUser(body);
                //var output = await response.Content.ReadAsStringAsync();
                ResetProps();
                navigationService.NavigateTo("Main");
            }
        }

        private void ResetProps()
        {
            phone = null;
            email = null;
            firstName = null;
            lastName = null;
            password = null;
            confirmPassword = null;
            RaisePropertyChanged("Phone");
            RaisePropertyChanged("Email");
            RaisePropertyChanged("FirstName");
            RaisePropertyChanged("LastName");
            RaisePropertyChanged("Password");
            RaisePropertyChanged("ConfirmPassword");
        }
        private class UserRegistrationInfo
        {
            public string phone;
            public string firstName;
            public string lastName;
            public string email;
            public string password;
        }
    }
}
