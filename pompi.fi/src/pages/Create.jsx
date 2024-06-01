import {useState} from 'react'

const Create = () => {
    const [formData, setFormData] = useState({
        name: '',
        ticker: '',
        description: '',
        image: '',
        telegramLink: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
      };
  return (
    <div className="w-full max-w-md mx-auto mt-5">
    <form onSubmit={handleSubmit} className="bg-background px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
        <label className="block text-foreground text-sm font-bold mb-2" htmlFor="name">
        name
        </label>
        <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"
        style={{backgroundColor: "#282A36"}}
        id="name"
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        />
    </div>
    <div className="mb-4">
        <label className="block text-foreground text-sm font-bold mb-2" htmlFor="ticker">
        ticker
        </label>
        <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"
        style={{backgroundColor: "#282A36"}}
        id="ticker"
        type="text"
        name="ticker"
        placeholder="Ticker"
        value={formData.ticker}
        onChange={handleChange}
        />
    </div>
    <div className="mb-4">
        <label className="block text-foreground text-sm font-bold mb-2" htmlFor="description">
        description
        </label>
        <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"
        style={{backgroundColor: "#282A36"}}
        id="description"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        />
    </div>
    <div className="mb-4">
        <label className="block text-foreground text-sm font-bold mb-2" htmlFor="image">
        image
        </label>
        <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"
        style={{backgroundColor: "#282A36"}}
        id="image"
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        />
    </div>
    <div className="mb-4">
        <label className="block text-foreground text-sm font-bold mb-2" htmlFor="telegramLink">
        telegram link
        </label>
        <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline"
        style={{backgroundColor: "#282A36"}}
        id="telegramLink"
        type="text"
        name="telegramLink"
        placeholder="Telegram Link"
        value={formData.telegramLink}
        onChange={handleChange}
        />
    </div>
    <div className="flex items-center justify-between">
        <button
        className="bg-purple-900 hover:bg-pink mt-2 font-bold py-2 px-4 w-full"
        type="submit"
        >
        Submit
        </button>
    </div>
    </form>
</div>
    )
}

export default Create