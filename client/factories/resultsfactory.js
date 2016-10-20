myApp.factory('resultsfactory', function($http) {
    var factory = {};

    //bundle data for results view
    factory.calcuations = function(info, callback) {
        var resultsData = {
                descriptionData: info.descriptionData,//job description input
                totalJobWords:info.totalJobWords,//total # of words in job description
                filterDescriptData: factory.filterTopDescripWords(info.descriptionData,totalJobWords),//filters out most relevant/recurring words in job description
                resumeData:info.resumeData,//resume input
                totalResumeWords:info.totalResumeWords,
                totalResumeWordPercent:(Math.round((info.totalResumeWords*100)/750)),//percentage of total resume/recommendation # of words
                actionWordCount:info.resumeData.totalActionCount,
                actionWordPercent:(Math.round((info.resumeData.totalActionCount*100)/20)),
                totalMatch:info.matchData.totalMatchWords,//total number of words that match between description and resume
                matchPercent:factory.matchPercentage(info.totalJobWords,info.matchData.totalMatchWords),
                wordCount:factory.wordCount(totalResumeWords)//gets over or under message for word count recommendation
        };
        var filteredMatchWords = factory.filterMatchWords(info.matchData,resultsData.filterDescriptData);//word match data from filtered map
        resultsData.filteredMatchWords = filteredMatchWords;
        callback(resultsData);
    };

    //total match percentage between resume and job description words
    factory.matchPercentage = function(totalWords,totalMatch) {
        var matchPercentage = Math.round((totalMatch/totalWords)*100);
        return matchPercentage;
    };

    //provides user recommendation based on wordcount
    factory.wordCount = function(total){
        var over = "over";
        var under = "under";

        if(total > 750){
            return over;
        }else if(total < 750){
            return under;
        }
    };

    //filters down to most prevalent job description words
    factory.filterTopDescripWords = function(words,totalwords){
        filteredJobMap = new HashMap();
        for(var key in words._data){
            if(words._data[key][1] > 2 && totalwords > 20){
                filteredJobMap.set(""+ words._data[key][0] +"",[words._data[key][1],0]);
            }else if (totalwords <= 20){
                filteredJobMap.set(""+ words._data[key][0] +"",[words._data[key][1],0]);
            }
        }
        return filteredJobMap;
    };

    //compares the filtered job description words to match data
    factory.filterMatchWords = function(matchData,filterData){
        filteredMatchMap = new HashMap();
        for (var key in filterData._data){
            if((matchData.get(filterData._data[key][0])) > 0){
                filteredMatchMap.set(""+ filterData._data[key][0] +"",matchData.get(filterData._data[key][0]));
            }else {
                filteredMatchMap.set(""+ filterData._data[key][0] +"","no match");
            }
        }
        return filteredMatchMap;
    };

    return factory;
});
