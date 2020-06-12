/* 
Copyright Marcus Parsons - 2017
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

//Created by Marcus Parsons - Copyright 2017
function atf() {
    var s = this;
    s.o = {};
    var _ = document.querySelector.bind(document);
    var __ = document.querySelectorAll.bind(document);

    this.styles = {};
    //again, thanks to uiGradients for these awesome gradients!
    //http://www.uiGradients.com
    this.styles.COOLBLUE = {
        background: '#357ebd',
        color: 'white'
    };
    this.styles.BLUESKIES = {
        background: 'linear-gradient(to right, #56ccf2, #2f80ed)',
        color: 'white'
    };
    this.styles.CLEARBLACK = {
        background: 'none',
        color: 'black'
    };
    this.styles.CLEARWHITE = {
        background: 'none',
        color: 'white'
    };
    this.styles.DEEPSEASPACE = {
        background: 'linear-gradient(to right, #2c3e50, #4ca1af)',
        color: 'white'
    };
    this.styles.HYDROGEN = {
        background: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
        color: 'white'
    };
    this.styles.LAWRENCIUM = {
        background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
        color: 'white'
    };
    this.styles.MILD = {
        background: 'linear-gradient(to right, #67b26f, #4ca2cd)',
        color: 'white'
    };
    this.styles.MOONPURPLE = {
        background: 'linear-gradient(to right, #4e54c8, #8f94fb)',
        color: 'white'
    };
    this.styles.MOSS = {
        background: 'linear-gradient(to right, #134e5e, #71b280)',
        color: 'white'
    };
    this.styles.ONYX = {
        background: 'linear-gradient(to bottom, #414345, #232526)',
        color: 'white'
    };
    this.styles.RAINBOWBLUE = {
        background: 'linear-gradient(to right, #00f260, #0575e6)',
        color: 'white'
    };
    this.styles.STRIPE = {
        background: 'linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb)',
        color: 'white'
    };
    this.styles.VENICE = {
        background: 'linear-gradient(to right, #6190e8, #a7bfe8)',
        color: 'white'
    };


    //update a property
    this.update = function (prop, obj) {
        if (typeof obj === "object") {
            switch (prop) {
                case "styles":
                    var keys = Object.keys(obj),
                        key;
                    for (i = 0; i < keys.length; i++) {
                        key = keys[i];
                        if (_('#' + s.o.container).style.hasOwnProperty(key)) {
                            _('#' + s.o.container).style[key] = obj[key];
                        }
                    }
                    break;
            }
        }
        else {
            s.o[prop] = obj;
            switch (prop) {
                case "searchText":
                    _('#' + s.o.container + '-atf-filtervalue').setAttribute("placeholder", s.o[prop]);
                    break;
            }
        }
    };

    //Remove a column from the filter selection
    this.removeColumn = function (columnName, partialMatch) {
        if (!partialMatch) {
            partialMatch = false;
        }

        if (columnName) {
            var selector = '#' + s.o.container + '-atf-filterselect option[value' + ((partialMatch) ? '*' : '') + '="' + columnName + '"]';

            var el = __(selector);
            if (el.length > 0) {
                var parentNode = _('#' + s.o.container + '-atf-filterselect');
                for (var i = 0; i < el.length; i++) {
                    var innerEl = el[i];
                    parentNode.removeChild(innerEl);
                }

            }
        }
    }

    //Add a number to the paging select
    this.addPagingOpt = function (val) {
        if (typeof val === "string" || typeof val === "number") {
            val = (typeof val === "string") ? parseInt(val, 10) : val;
            if (!isNaN(val)) {
                var sel = _('#' + s.o.container + '-atf-paging-select');
                var opts = sel.querySelectorAll('option');
                var a = [];
                var dregx = /^[0-9]+$/;
                var ia = false;
                for (var i = 0; i < opts.length; i++) {
                    if (dregx.test(opts[i].innerHTML.trim()) === true) {
                        a.push(+opts[i].innerHTML);
                    }
                    if (opts[i].innerHTML.toUpperCase() === 'ALL') {
                        ia = true;
                    }
                }
                a.push(val);
                a.sort(function (a, b) {
                    if (a > b) return 1;
                    if (a < b) return -1;
                    return 0;
                });
                if (ia) {
                    a.push("ALL");
                }
                sel.innerHTML = '';
                for (var n in a) {
                    sel.innerHTML += '<option value="' + a[n] + '">' + a[n] + '</option>';
                }
                if (typeof s.o.defaultView !== "undefined") {
                    var __opt = _('#' + s.o.container + '-atf-paging-select option[value="' + s.o.defaultView + '"]');
                    if (__opt) {
                        __opt.setAttribute('selected', 'selected');
                    }
                }
            }
        }
    };

    this.removePagingOpt = function (val) {
        if (typeof val === "string" || typeof val === "number") {
            var __opt = _('#' + s.o.container + '-atf-paging-select option[value="' + val + '"]');
            if (__opt) {
                __opt.remove();
            }
            if (typeof s.o.defaultView !== "undefined") {
                if (s.o.defaultView.toString() === val.toString()) {
                    var els = __('#' + s.o.container + '-atf-paging-select option');
                    s.o.defaultView = els[0];
                }
            }
        }
    };

    function filter() {
        var filtertype, filterval, filters = [];
        filtertype = _('#' + s.o.container + '-atf-filterselect').value;
        filterval = (s.o.caseSensitive) ? _('#' + s.o.container + '-atf-filtervalue').value : _('#' + s.o.container + '-atf-filtervalue').value.toLowerCase();
        var ths = __('#' + s.o.table + ' thead > tr > th');
        for (var i = 0; i < ths.length; i++) {
            var thval = (ths[i].querySelectorAll('*').length > 0 ? ths[i].childNodes[0].valueOf().textContent : ths[i].innerText.trim());
            filters.push(thval);
        }
        var trs = __('#' + s.o.container + '-atf-tbody > tr');
        if (filtertype === 'All') {
            for (i = 0; i < trs.length; i++) {
                var tdlist = trs[i].getElementsByTagName('td');
                var curtr = trs[i];
                tdloop:
                for (var m = 0; m < tdlist.length; m++) {
                    var tdhtml = (s.o.caseSensitive) ? tdlist[m].innerHTML : tdlist[m].innerHTML.toLowerCase();
                    if (tdhtml.indexOf(filterval) > -1) {
                        if (curtr.classList.contains('hider')) {
                            curtr.classList.remove('hider');
                        }
                        else {
                            if (s.o.isToggleableTable && curtr.previousElementSibling) {
                                if (curtr.previousElementSibling.classList.contains('hider')) {
                                    curtr.previousElementSibling.classList.remove('hider');
                                }
                            }
                        }
                        break tdloop;
                    }
                    else {
                        if (m === tdlist.length - 1) {
                            curtr.classList.add('hider');
                        }
                    }
                }
            }
        }
        else {
            var fi = filters.indexOf(filtertype);
            for (i = 0; i < trs.length; i++) {
                curtr = trs[i];
                tdlist = curtr.getElementsByTagName('td');
                tdhtml = (s.o.caseSensitive === true) ? tdlist[fi].innerHTML : tdlist[fi].innerHTML.toLowerCase();
                if (tdhtml.indexOf(filterval) > -1) {
                    if (curtr.classList.contains('hider')) {
                        curtr.classList.remove('hider');
                    }
                    else {
                        if (s.o.isToggleableTable && curtr.previousElementSibling) {
                            if (curtr.previousElementSibling.classList.contains('hider')) {
                                curtr.previousElementSibling.classList.remove('hider');
                            }
                        }
                    }
                }
                else {
                    curtr.classList.add('hider');
                }
            }
        }

        if (typeof s.o.onSearched === "function") {
            s.o.onSearched();
        }
    }

    if (typeof arguments[0] === "object" && Object.keys(arguments[0]).length) {
        var options = arguments[0];
        var availoptions = ['table', 'container', 'submitBy', 'display', 'includeLabel', 'labelText', 'isToggleableTable', 'searchText',
            'styles', 'columnSelect', 'ignoreRows', 'caseSensitive', 'paging', 'pagingViews', 'defaultView', 'onComplete', 'onSearched', 'removePrevious'];
        var givenoptions = Object.keys(options);

        if (givenoptions.indexOf('table') < 0) {
            console.error('Error: no table listed in options given to auto-table-filter.  Please at least specify the table and a container to perform filtering with.');
            return false;
        }
        if (givenoptions.indexOf('container') < 0) {
            console.error('Error: no container listed in options given to auto-table-filter.  Please specify a container to perform filtering with by specifying its id i.e.\ncontainer: "myContainer".');
            return false;
        }
        for (var i = 0; i < availoptions.length; i++) {
            var optval = options[availoptions[i]];
            var prop = availoptions[i];
            var coll = ["boolean", "string", "number", "function"];
            if (typeof optval !== "undefined") {
                if (coll.indexOf(typeof optval) > -1) {
                    s.o[prop] = optval;
                }
                else if (typeof optval === "object") {
                    if (optval instanceof Array) {
                        s.o[prop] = [];
                        for (var _z = 0; _z < optval.length; _z++) {
                            s.o[prop].push(optval[_z]);
                        }
                    }
                    else {
                        s.o[prop] = {};
                        for (var key in optval) {
                            s.o[prop][key] = optval[key];
                        }
                    }
                }
            }
        }

        if (!s.o.table) {
            console.error('Error: please make sure to specify an id for the table being filtered.  Use the same format as the id attribute in HTML i.e. a table with id="myFilteredTable" needs the table property set to "myFilteredTable".');
            return false;
        }       

        _('#' + s.o.table + ' > tbody').setAttribute("id", s.o.container + "-atf-tbody");

        //GOTO HERE
        //THIS HAS TO BE REDONE (TEMP FOR TEMP SORTING)
        //NEEDS TO BE ADDED IN AS A FEATURE (USE BASICALLY EXISTING CODE YOU MADE ON THE JOBS INDEX PAGE)
        (function () {
            var trs = __('#' + s.o.table + ' > tbody > tr');
            for (var i = 0; i < trs.length; i++) {
                var tr = trs[i];
                tr.setAttribute("data-atf-index", i);
            }
        })();
        

        if (typeof s.o.removePrevious !== "boolean") {
            s.o.removePrevious = true;
        }

        if (typeof s.o.ignoreRows === "object") {
            if (s.o.ignoreRows.length > 0) {
                s.o.ignoreRowsSelector = s.o.ignoreRows.map(function (r) {
                    return '.' + r;
                }).join(',');
            }
        }

        (function (s) {
            if (s.o.container && s.o.removePrevious === true) {
                _('#' + s.o.container).innerHTML = '';
                if (__('#' + s.o.container + '-atf-paging-container').length > 0) {
                    var pr = _('#' + s.o.container + '-atf-paging-container').parentNode;
                    pr.removeChild(_('#' + s.o.container + '-atf-paging-container'));
                }
            }
        })(s);

        //Setting up the container with filtering tools
        if (s.o.container) {
            (function (s) {
                var keys;
                _('#' + s.o.container).classList.add('atf-filter-container');
                if (typeof s.o.styles === "string") {
                    s.o.styles = s.o.styles.toUpperCase();
                    if (s.styles.hasOwnProperty(s.o.styles)) {
                        keys = Object.keys(s.styles[s.o.styles]);
                        for (i = 0; i < keys.length; i++) {
                            if (_('#' + s.o.container).style.hasOwnProperty([keys[i]])) {
                                _('#' + s.o.container).style[keys[i]] = s.styles[s.o.styles][keys[i]];
                            }
                        }
                    }
                    else if (typeof s.o.styles === "object") {
                        keys = Object.keys(s.o.styles);
                        for (i = 0; i < keys.length; i++) {
                            if (_('#' + s.o.container).style.hasOwnProperty([keys[i]])) {
                                _('#' + s.o.container).style[keys[i]] = s.o.styles[keys[i]];
                            }
                        }
                    }
                }
                _('#' + s.o.container).innerHTML = ((typeof s.o.includeLabel === "undefined" || s.o.includeLabel === true) ? "<label for='atf-filtervalue'>" + ((typeof s.o.labelText !== "undefined" && typeof s.o.labelText === "string") ? s.o.labelText : "Search:") + "</label> &nbsp;" : "") + "<input type='text' class='atf-filtervalue' id='" + s.o.container + "-atf-filtervalue' placeholder='" + ((typeof s.o.searchText === "undefined" || s.o.searchText === "") ? "Enter a value to search for" : s.o.searchText) + "'>";
                if (typeof s.o.columnSelect === "undefined" || s.o.columnSelect === true) {
                    _('#' + s.o.container).innerHTML += "&nbsp; by column &nbsp; <select class='atf-filterselect' id='" + s.o.container + "-atf-filterselect'></select> &nbsp;";
                }
                else {
                    _('#' + s.o.container).innerHTML += "<select id='" + s.o.container + "-atf-filterselect' class='hider'></select> &nbsp;";
                }

                if (s.o.submitBy === 'button') {
                    _('#' + s.o.container).innerHTML += "<button class='atf-filtersubmit' id='" + s.o.container + "-atf-filtersubmit'>Submit</button>";
                }
                var ths = __('#' + s.o.table + ' > thead > tr > th');
                var seloptions = "<option value='All' selected='selected'>All</option>";
                for (i = 0; i < ths.length; i++) {
                    var thval = (ths[i].querySelectorAll('*').length > 0 ? ths[i].childNodes[0].valueOf().textContent : ths[i].innerText.trim());
                    if (thval !== '') {
                        seloptions += "<option value='" + thval + "'>" + thval + "</option>";
                    }
                }
                _('#' + s.o.container + '-atf-filterselect').innerHTML = seloptions;
                _('#' + s.o.container).style.display = (typeof s.o.display !== "undefined" && s.o.display !== "") ? s.o.display : 'block';

                if (s.o.submitBy === 'button') {
                    _('#' + s.o.container + '-atf-filtersubmit').addEventListener('click', function () { filter('container'); }, false);
                }

                _('#' + s.o.container + '-atf-filtervalue').addEventListener('keyup', function (e) {
                    if (e.which === 27) {
                        _('#' + s.o.container + '-atf-filtervalue').value = '';
                        filter('container');
                    }
                    if (e.which === 13 && (s.o.submitBy === 'button' || !s.o.submitBy)) {
                        filter('container');
                    }
                    if (e.which === 8 && _('#' + s.o.container + '-atf-filtervalue').value === '') {
                        var trs = __('#' + s.o.container + '-atf-tbody > tr');
                        if (typeof s.o.paging === "undefined") {
                            for (i = 0; i < trs.length; i++) {
                                trs[i].classList.remove('hider');
                            }
                        }
                        else {
                            var curopttxt = (__('#' + s.o.container + '-atf-paging-select').length > 0) ? _('#' + s.o.container + '-atf-paging-select').options[_('#' + s.o.container + '-atf-paging-select').selectedIndex].text : 'ALL';
                            if (curopttxt !== 'ALL') {
                                var curval = +curopttxt;
                                var curselopt = __('.atf-page-number-selected');
                                var pageval = +curselopt[0].innerHTML;
                                var baseval = (pageval - 1) * curval;
                                if (typeof s.o.isToggleableTable !== "undefined") {
                                    if (s.o.isToggleableTable === true) {
                                        for (i = 0; i < curval * 2; i++) {
                                            if (typeof trs[i] !== "undefined") {
                                                trs[i].classList.remove('hider');
                                            }
                                        }
                                        for (i = trs.length - 1; i >= curval * 2; i--) {
                                            if (typeof trs[i] !== "undefined") {
                                                trs[i].classList.add('hider');
                                            }
                                        }
                                    }
                                    else {
                                        for (i = trs.length - 1; i >= 0; i--) {
                                            if (typeof trs[i] !== "undefined") {
                                                trs[i].classList.add('hider');
                                            }
                                        }
                                        for (i = baseval; i < baseval + curval; i++) {
                                            if (i !== trs.length) {
                                                if (typeof trs[i] !== "undefined") {
                                                    trs[i].classList.remove('hider');
                                                }
                                            }
                                        }
                                    }
                                }
                                else {
                                    for (i = trs.length - 1; i >= 0; i--) {
                                        trs[i].classList.add('hider');
                                    }
                                    for (i = baseval; i < baseval + curval; i++) {
                                        if (i !== trs.length) {
                                            trs[i].classList.remove('hider');
                                        }
                                    }
                                }
                            }
                            else {
                                for (i = trs.length - 1; i >= 0; i--) {
                                    trs[i].classList.remove('hider');
                                }
                            }
                        }

                    }
                    if (s.o.submitBy === 'typing' && _('#' + s.o.container + '-atf-filtervalue').value !== '') {
                        filter('container');
                    }
                }, false);
            })(s);
        }

        //paging
        if (typeof s.o.paging !== "undefined") {
            if (s.o.paging === true) {
                (function (s) {
                    var pagingEl = document.createElement("div");
                    pagingEl.id = s.o.container + '-atf-paging-container';
                    pagingEl.setAttribute('class', 'atf-paging-container');
                    _('#' + s.o.container).insertAdjacentElement('afterend', pagingEl);
                    if (typeof s.o.pagingViews !== "undefined") {
                        if (s.o.pagingViews.length < 1) {
                            console.error("Error: paging is set to true, but the pagingViews array was empty.  Please give an array of number values that correspond to the number of items to show when selected (and/or an optional 'ALL' view).");
                            return false;
                        }
                        else {
                            //add in the paging label
                            var pagingLabel = document.createElement('label');
                            pagingLabel.innerHTML = 'Show Records: &nbsp;&nbsp;&nbsp;';
                            pagingLabel.id = s.o.container + '-atf-paging-label';
                            pagingLabel.setAttribute('for', 'atf-paging-select');
                            _('#' + s.o.container + '-atf-paging-container').insertAdjacentElement('beforeend', pagingLabel);
                            //add in the paging select
                            var pagingSelect = document.createElement('select');
                            pagingSelect.id = s.o.container + '-atf-paging-select';
                            pagingSelect.setAttribute('class', 'atf-paging-select');
                            _('#' + s.o.container + '-atf-paging-label').insertAdjacentElement('afterend', pagingSelect);
                            //insert the options into the paging select from the list of views
                            for (var _po = 0; _po < s.o.pagingViews.length; _po++) {
                                var pagingOption = document.createElement('option');
                                pagingOption.innerHTML = s.o.pagingViews[_po];
                                pagingOption.value = s.o.pagingViews[_po];
                                _('#' + s.o.container + '-atf-paging-select').insertAdjacentElement('beforeend', pagingOption);
                            }
                            //set the select to be the s.o.defaultView, if defined and 
                            if (typeof s.o.defaultView !== 'undefined') {
                                if (typeof s.o.defaultView === 'string' && s.o.defaultView !== 'ALL') {
                                    s.o.defaultView = +s.o.defaultView;
                                }
                                var __opt;
                                if (s.o.defaultView === 'ALL') {
                                    __opt = _('#' + s.o.container + '-atf-paging-select option[value="ALL"]');
                                    if (__opt) {
                                        __opt.setAttribute('selected', 'selected');
                                    }
                                }
                                else {
                                    if (s.o.pagingViews.indexOf(s.o.defaultView) < 0) {
                                        s.o.defaultView = s.o.pagingViews[0];
                                    }
                                    __opt = _('#' + s.o.container + '-atf-paging-select option[value="' + s.o.defaultView + '"]');
                                    if (__opt) {
                                        __opt.setAttribute('selected', 'selected');
                                    }
                                }

                            }
                            var curval = _('#' + s.o.container + '-atf-paging-select').options[_('#' + s.o.container + '-atf-paging-select').selectedIndex].text;
                            var recordsPerPage = +curval;
                            var trs = __('#' + s.o.container + '-atf-tbody > tr');
                            trloop2:
                            for (var _tr = 0; _tr < trs.length; _tr++) {
                                if (typeof s.o.ignoreRows !== "undefined" && typeof s.o.ignoreRows === "object") {
                                    var trclasses = trs[_tr].classList;
                                    for (var _ic = 0; _ic < s.o.ignoreRows.length; _ic++) {
                                        if (trclasses.contains(s.o.ignoreRows[_ic])) {
                                            continue trloop2;
                                        }
                                    }
                                }
                                if (curval === 'ALL') {
                                    break;
                                }
                                else {
                                    if (typeof s.o.isToggleableTable !== "undefined") {
                                        if (s.o.isToggleableTable === true) {
                                            if (_tr >= recordsPerPage * 2) {
                                                trs[_tr].classList.add('hider');
                                            }
                                            _tr++;
                                        }
                                        else {
                                            if (_tr >= recordsPerPage) {
                                                trs[_tr].classList.add('hider');
                                            }
                                        }
                                    }
                                    else {
                                        if (_tr >= recordsPerPage) {
                                            trs[_tr].classList.add('hider');
                                        }
                                    }
                                }
                            }

                            //Paging buttons
                            var selector = '#' + s.o.container + '-atf-tbody > tr';
                            if (typeof s.o.ignoreRowsSelector === "string") {
                                selector += ':not(' + s.o.ignoreRowsSelector + ')';
                            }
                            trs = __(selector);
                            var totalRows = trs.length;
                            var totalPages = Math.ceil(totalRows / recordsPerPage);
                            var pagingNumberContainer = document.createElement('div');
                            pagingNumberContainer.style.display = 'inline-block';
                            pagingNumberContainer.classList.add('atf-paging-number-container');
                            pagingNumberContainer.id = s.o.container + '-atf-paging-number-container';
                            pagingEl.insertAdjacentElement('beforeend', pagingNumberContainer);
                            for (var _i = 0; _i < totalPages; _i++) {
                                var span = document.createElement('span');
                                span.classList.add('atf-page-number');
                                if (_i === 0) {
                                    span.classList.add('atf-page-number-selected');
                                }
                                span.innerHTML = (_i + 1).toString();
                                pagingNumberContainer.insertAdjacentElement('beforeend', span);
                            }
                            var pageButtons = __('.atf-page-number');
                            for (_i = 0; _i < pageButtons.length; _i++) {
                                pageButtons[_i].addEventListener('click', function () {
                                    for (var _x = 0; _x < pageButtons.length; _x++) {
                                        pageButtons[_x].classList.remove('atf-page-number-selected');
                                    }
                                    this.classList.add('atf-page-number-selected');
                                    var num = +this.innerHTML;
                                    var beginning = (num - 1) * recordsPerPage;
                                    var ending = (num * recordsPerPage - 1);
                                    var selector = '#' + s.o.container + '-atf-tbody > tr';
                                    if (typeof s.o.ignoreRowsSelector === "string") {
                                        selector += ':not(' + s.o.ignoreRowsSelector + ')';
                                    }
                                    trs = __(selector);
                                    for (var _y = trs.length - 1; _y >= 0; _y--) {
                                        if (_y > beginning - 1 && _y < ending + 1) {
                                            trs[_y].classList.remove('hider');
                                        }
                                        else {
                                            trs[_y].classList.add('hider');
                                        }
                                    }
                                });
                            }

                            _('#' + s.o.container + '-atf-paging-select').addEventListener('change', function () {
                                var curval = this.options[this.selectedIndex].text;
                                var recordsPerPage = parseInt(curval, 10);
                                var trs = __('#' + s.o.container + '-atf-tbody > tr');

                                for (var _tr = 0; _tr < trs.length; _tr++) {
                                    trs[_tr].classList.remove('hider');
                                }
                                trloop2:
                                for (_tr = 0; _tr < trs.length; _tr++) {
                                    if (typeof s.o.ignoreRows !== "undefined" && typeof s.o.ignoreRows === "object") {
                                        var trclasses = trs[_tr].classList;
                                        for (var _ic = 0; _ic < s.o.ignoreRows.length; _ic++) {
                                            if (trclasses.contains(s.o.ignoreRows[_ic])) {
                                                continue trloop2;
                                            }
                                        }
                                    }
                                    if (curval === 'ALL') {
                                        break;
                                    }
                                    else {
                                        if (typeof s.o.isToggleableTable !== "undefined") {
                                            if (s.o.isToggleableTable === true) {
                                                if (_tr >= recordsPerPage * 2) {
                                                    trs[_tr].classList.add('hider');
                                                }
                                                _tr++;
                                            }
                                            else {
                                                if (_tr >= recordsPerPage) {
                                                    trs[_tr].classList.add('hider');
                                                }
                                            }
                                        }
                                        else {
                                            if (_tr >= recordsPerPage) {
                                                trs[_tr].classList.add('hider');
                                            }
                                        }
                                    }
                                }
                                //paging buttons
                                var el = _('#' + s.o.container + '-atf-paging-number-container');
                                el.parentNode.removeChild(el);
                                var selector = '#' + s.o.container + '-atf-tbody > tr';
                                if (typeof s.o.ignoreRowsSelector === "string") {
                                    selector += ':not(' + s.o.ignoreRowsSelector + ')';
                                }
                                trs = __(selector);
                                var totalRows = trs.length;
                                var totalPages = Math.ceil(totalRows / recordsPerPage);
                                var pagingNumberContainer = document.createElement('div');
                                pagingNumberContainer.style.display = 'inline-block';
                                pagingNumberContainer.classList.add('atf-paging-number-container');
                                pagingNumberContainer.id = s.o.container + '-atf-paging-number-container';
                                pagingEl.insertAdjacentElement('beforeend', pagingNumberContainer);
                                for (var _i = 0; _i < totalPages; _i++) {
                                    var span = document.createElement('span');
                                    span.classList.add('atf-page-number');
                                    if (_i === 0) {
                                        span.classList.add('atf-page-number-selected');
                                    }
                                    span.innerHTML = (_i + 1).toString();
                                    pagingNumberContainer.insertAdjacentElement('beforeend', span);
                                }
                                var pageButtons = __('.atf-page-number');
                                for (_i = 0; _i < pageButtons.length; _i++) {
                                    pageButtons[_i].addEventListener('click', function () {
                                        for (var _x = 0; _x < pageButtons.length; _x++) {
                                            pageButtons[_x].classList.remove('atf-page-number-selected');
                                        }
                                        this.classList.add('atf-page-number-selected');
                                        var num = parseInt(this.innerHTML, 10);
                                        var beginning = (num - 1) * recordsPerPage;
                                        var ending = (num * recordsPerPage - 1);
                                        var selector = '#' + s.o.container + '-atf-tbody > tr';
                                        if (typeof s.o.ignoreRowsSelector === "string") {
                                            selector += ':not(' + s.o.ignoreRowsSelector + ')';
                                        }
                                        trs = __(selector);
                                        for (var _y = trs.length - 1; _y >= 0; _y--) {
                                            if (_y > beginning - 1 && _y < ending + 1) {
                                                trs[_y].classList.remove('hider');
                                            }
                                            else {
                                                trs[_y].classList.add('hider');
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    }
                    else {
                        console.error("Error: paging is set to true, but no pagingViews array was given.  Please give an array of values that correspond to the number of items to show when selected.");
                        return false;
                    }
                })(s);
            }
        }
    }
    else if (typeof arguments[0] !== "object" || typeof arguments[0] === "undefined") {
        console.error('Error: make sure to pass in a set of {} surrounding your properties like so:\natf({\n  table: "myTable",\n  container: "myContainer",\n  submitBy: "typing"\n});');
    }
    else if (Object.keys(arguments[0]).length < 1) {
        console.error('Error: no properties listed in the options object given to auto-table-filter.  Please at least specify the table, a container, and submitBy for filtering elements to perform filtering with. Remember to set these to the id values for the elements the same as the HTML id attribute i.e. a table with the id of "myFilteredTable" needs to have "myFilteredTable" passed to auto-table-filter as the table id and same with any other element based options.');
        return false;
    }

    if (typeof s.o.onComplete === "function") {
        s.o.onComplete();
    }
}
