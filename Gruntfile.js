module.exports = function(grunt) {
  grunt.initConfig({
  // το αρχείο package.jsοn που περιγράφει τα modules - dependencies του έργου μας 
  pkg: grunt.file.readJSON('package.json'), 
   // λειτουργία με όνομα less - αντιστοιχεί στο module grunt-contrib-less
   less: {
    // μπορούμε για κάθε λειτουργία να δημιουργούμε διαφορετικά
    // enviroments με διαφορετικές ρυθμίσεις το κάθε ένα
    // π.χ. το development απλώς κάνει compile τον κώδικα less σε css
    development: {
      options: {
        // το, τα path στο οποίο θα γίνεται scan για πιθανές εντολές @import
        paths: ["less"]
      },
      // το αρχείο που θα παραχθεί και το αρχείο προορισμού
      files: {
        "dist/css/bootstrap.css": "less/bootstrap.less"
      }
    },
    // στο enviroment production εκτός από compile κάνουμε και minify
    // τον κώδικα css - cleancss: true
    production: {
      options: {
        paths: ["less"],
        cleancss: true
      },
      files: {
        "dist/css/bootsrap.min.css": "less/bootstrap.less"
      }
    }
  },
  // η λειτουργία concat αναλαμβάνει να δημιουργήσει ένα αρχείο
  // javascript από περισσότερα. Αντιστοιχεί στο module grunt-contrib-concat
  concat: {
    options: {
      separator: ';'
    },
    // έχουμε δύο αρχεία javascript
    dist: {
     src: [
     'js/first.js',
     'js/second.js'
     ],
     // και παράγουμε ένα
     dest: 'dist/js/script.js'
   }
 },
 // η λειτουργία που κάνει minify τον κώδικα javascript
 uglify: {
  dist: {
    // το αρχείου προορισμού είναι αυτό που παράγεται
    // από την προηγούμενη διαδικασία του concat
    files: {
      'dist/js/script.min.js': ['<%= concat.dist.dest %>']
    }
  }
},
// η λειτουργία που ελέγχει τον κώδικα javascript για σφάλματα
jshint: {
  files: ['Gruntfile.js', 'js/*.js']
},
// η λειτουργία που παρακολουθεί φακέλους
// και σε κάθε αλλαγή αρχείων στον κάθε φάκελο
// εκτελεί τα tasks που πρέπει
watch: {
  css: {
    files: "less/*.less",
    tasks: ["less"]
  },
  js: {
    files: ['<%= jshint.files %>'],
    tasks: ['jshint','concat', 'uglify']
  }
}
});


grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');

grunt.registerTask('default', ['less:development','jshint','concat']);

grunt.registerTask('production', ['less:production','jshint','concat','uglify']);

};
