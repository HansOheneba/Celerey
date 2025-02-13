const formatCurrency = (value: string, currency: string) => {
    if (value && currency) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency.toUpperCase(),
      })
      return formatter.format(+value)
    }

    return 0
  }


  export default formatCurrency;