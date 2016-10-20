myApp.factory('resumefactory', function($http) {
    var factory = {};

    factory.postData = function(postdata, callback) {
        factory.allPostData = postdata;
        callback(postdata);
    };

    factory.getData = function(){
        return factory.allPostData;
    };

    //creates a new object to hold job description words.
    factory.createDescriptionMap = function(info, callback) {
        var uniqueWords, //prevents dupes from skewing percentages
            descriptionMap = new HashMap();
            jobWords = (info.toLowerCase()).split(" ");
            totalJobWords = 0; //overall total word count in the job description field.

        //for each word, remove articles, add uniques to map, update total job description word count
        for (var word in jobWords){
            totalJobWords += 1;

            var wordExclusion = factory.wordExcludeCheck(jobWords[word]);//remove certain words from analysis
            var strippedJobWord = factory.stripPunctuation(jobWords[word]);//strip punctuation from analysis

            if (wordExclusion !== 1){//if word is not in the list
                var isUnique = factory.isUnique(strippedJobWord,descriptionMap);
                if (isUnique === true){
                    descriptionMap.set(""+ strippedJobWord +"",1);
                }else{
                    var value = descriptionMap.get(""+ strippedJobWord+"");
                    var newvalue = value + 1; //increment word count for recurring words
                    descriptionMap.set(""+ strippedJobWord +"",newvalue);
                }
            }
        }
        callback(descriptionMap,totalJobWords);
    };

    //creates new object from user's custom resume input
    factory.createResumeMap = function(info, callback) {
        var uniqueWords,
            resumeMap = new HashMap();
            resumeWords = (info.toLowerCase()).split(" ");
            totalResumeWords = 0;
            totalActionCount = 0;

        for (var word in resumeWords){
            totalResumeWords += 1;
            var wordExclusion = factory.wordExcludeCheck(resumeWords[word]);
            var strippedWord = factory.stripPunctuation(resumeWords[word]);

            if (wordExclusion !== 1){
                //check for unique words to add to Map
                var isUnique = factory.isUnique(strippedWord,resumeMap);
                    if (isUnique === true){
                        resumeMap.set(""+ strippedWord +"",1);
                    }else{
                        var value = resumeMap.get(""+ strippedWord+"");
                        var newvalue = value + 1;
                        resumeMap.set(""+ strippedWord +"",newvalue);
                    }
                //check for action words and data
                var actionCount = factory.checkActionWords(strippedWord);
                totalActionCount += actionCount;
            }
        }
        resumeMap.totalActionCount = totalActionCount;
        callback(resumeMap);
    };

    factory.checkMatchingWords = function(jobWords,resumeWords,callback){
        var totalMatchWords = 0;
        matchMap = new HashMap();

        //check if resume includes each job description word
        for(var key in jobWords._data){
            var search = resumeWords.has(jobWords._data[key][0]);
            if (search === true){
                matchMap.set(""+ jobWords._data[key][0] +"",resumeWords._data[key][1]);
                totalMatchWords += 1;
            } else if(search === false){
                matchMap.set(""+ jobWords._data[key][0] +"",0);
            }
        }

        matchMap.totalMatchWords = totalMatchWords;
        callback(matchMap);
    };

    //checks against existing data to see if word has already been processed.
    factory.isUnique = function(word,descriptionMap){
        var search = descriptionMap.has(word);
        if(search === false){
            return true; //indicating the word is unique.
        }else if(search === true){
            return false;//indicating the word is not unique.
        }
    };

    //searches for action statements in array
    factory.checkActionWords = function(word){
        var actionwords = ["achieved","improved","trained","mentored","managed","led","created","resolved","volunteered","influenced","increased","decreased","negotiated","launched","revenue","profits","budget","won","collaborated","conceptualized"];
        var search = actionwords.indexOf(""+word+"");
            if(search !== -1){
                return 1;
            } else{
                return 0;
            }
    };

    factory.stripPunctuation = function(word){
        var punctuation = [',','"',':','.',';','/','-','–','!','?','(',')','|','$','&','%','•','+',' ','','\n','@','0','1','2',
                           '3','4','5','6','7','8','9'];
        var firstchar = punctuation.indexOf(""+word[0]+"");
            lastchar = punctuation.indexOf(""+word[word.length-1]+"");
            strippedWord = '';

            //loop through until all outer punction is removed from each word.
            while(firstchar !== -1 || lastchar !== -1){
                if(firstchar !== -1){
                    strippedWord = word.slice(1);
                    return factory.stripPunctuation(strippedWord);
                }if(lastchar !== -1){
                    strippedWord = word.slice(0,(word.length-1));
                    return factory.stripPunctuation(strippedWord);
                }
            }
        if (word.length > 0){ //prevent empty spaces from showing as results after word strip.
            return word;
        }
    };

    //ignores any common word from the matching/no match count.
    factory.wordExcludeCheck = function(word){
        var wordExclusions = ["and","the","is","but","a","or","job","as","be","by","for","from","in"," ","  ","","to","of","an","at","on","with","that","uses"];
        var search = wordExclusions.indexOf(""+word+"");
            if(search !== -1){
                return 1;//indicates word is in wordExclusions list.
            } else{
                return 0;
            }
    };

    return factory;
});
