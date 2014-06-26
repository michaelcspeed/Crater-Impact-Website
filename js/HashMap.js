//##############################################################
/**
JavaSctipt has not hash map functionality, because true hash 
maps require access to the memory locations of objects. However, 
JavaScript does not even provide functionality that replacates 
the behaviour of Hash maps. Hence this library does.
**/
//##############################################################

function HashMap(obj)
{
    this.length = 0;
    this.items = {};
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            this.items[p] = obj[p];
            this.length++;
        }
    }

	/**
	Put an item in the hash tablle
	**/
     HashMap.prototype.put = function(key, value)
    {
        var previous = undefined;
        if (this.hasItem(key)) {
            previous = this.items[key];
        }
        else {
            this.length++;
        }
        this.items[key] = value;
		var ky = this.hasItem(key) ? this.items[key] : undefined;
        return previous;
    }

	/**
	Get an item from the hash table.
	**/
    HashMap.prototype.get = function(key) {
		var itm = this.items[key];
       var ky = this.hasItem(key) ? this.items[key] : undefined;
	   return ky;
    }

	/**
	Check if hash has item allready.
	**/
    HashMap.prototype.hasItem = function(key)
    {
        return this.items.hasOwnProperty(key);
    }
   
   /**
   Remove an item from the table.
   **/
    HashMap.prototype.remove = function(key)
    {
        if (this.hasItem(key)) {
            previous = this.items[key];
            this.length--;
            delete this.items[key];
            return previous;
        }
        else {
            return undefined;
        }
    }

	/**
	Return the keys in an array.
	**/
    HashMap.prototype.keys = function()
    {
        var keys = [];
        for (var k in this.items) {
            if (this.hasItem(k)) {
                keys.push(k);
            }
        }
        return keys;
    }

	/**
	Return the values in an array.
	**/
    HashMap.prototype.values = function()
    {
        var values = [];
        for (var k in this.items) {
            if (this.hasItem(k)) {
                values.push(this.items[k]);
            }
        }
        return values;
    }

	/**
	Each function allows the object to be used in a for each loop.
	**/
    HashMap.prototype.each = function(fn) {
        for (var k in this.items) {
            if (this.hasItem(k)) {
                fn(k, this.items[k]);
            }
        }
    }

	/**
	Clears the contents of the HashMap table.
	**/
    HashMap.prototype.clear = function()
    {
        this.items = {}
        this.length = 0;
    }
}//##############################################################