/**
 * Trie Node Class
 * Represents a single node in the Trie data structure
 */
class TrieNode {
  constructor() {
    this.children = {}; // Map of character to TrieNode
    this.isEndOfWord = false; // Marks if this node completes a word
    this.frequency = 0; // How many times this word has been used
    this.word = null; // Store the complete word at end nodes
  }
}

/**
 * Trie Data Structure Class
 * Efficient prefix-based word storage and retrieval
 */
export class Trie {
  constructor() {
    this.root = new TrieNode();
    this.totalWords = 0;
  }

  /**
   * Insert a word into the Trie
   * @param {string} word - Word to insert
   * @param {number} frequency - Initial frequency (default: 1)
   */
  insert(word, frequency = 1) {
    if (!word || typeof word !== 'string') return;
    
    word = word.toLowerCase().trim();
    if (word.length === 0) return;

    let node = this.root;
    
    // Traverse/create path for each character
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    
    // Mark end of word and update frequency
    if (!node.isEndOfWord) {
      this.totalWords++;
    }
    node.isEndOfWord = true;
    node.frequency += frequency;
    node.word = word;
  }

  /**
   * Search for exact word in Trie
   * @param {string} word - Word to search
   * @returns {boolean} - True if word exists
   */
  search(word) {
    if (!word) return false;
    
    word = word.toLowerCase().trim();
    let node = this.root;
    
    for (let char of word) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    
    return node.isEndOfWord;
  }

  /**
   * Get all words with given prefix
   * @param {string} prefix - Prefix to search
   * @param {number} limit - Maximum suggestions (default: 5)
   * @param {string} sortBy - 'frequency' or 'alphabetical'
   * @returns {Array} - Array of suggestion objects
   */
  getSuggestions(prefix, limit = 5, sortBy = 'frequency') {
    if (!prefix || typeof prefix !== 'string') return [];
    
    prefix = prefix.toLowerCase().trim();
    if (prefix.length === 0) return [];

    // Navigate to prefix node
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) {
        return []; // Prefix doesn't exist
      }
      node = node.children[char];
    }

    // Collect all words from this node
    const suggestions = [];
    this._collectWords(node, suggestions);

    // Sort based on criteria
    if (sortBy === 'frequency') {
      suggestions.sort((a, b) => b.frequency - a.frequency);
    } else {
      suggestions.sort((a, b) => a.word.localeCompare(b.word));
    }

    // Return top N suggestions
    return suggestions.slice(0, limit);
  }

  /**
   * Recursively collect all words from a node
   * @param {TrieNode} node - Starting node
   * @param {Array} results - Array to collect results
   * @private
   */
  _collectWords(node, results) {
    if (node.isEndOfWord) {
      results.push({
        word: node.word,
        frequency: node.frequency
      });
    }

    // Recursively check all children
    for (let char in node.children) {
      this._collectWords(node.children[char], results);
    }
  }

  /**
   * Increment word frequency
   * @param {string} word - Word to increment
   */
  incrementFrequency(word) {
    if (!word) return;
    
    word = word.toLowerCase().trim();
    let node = this.root;
    
    for (let char of word) {
      if (!node.children[char]) return;
      node = node.children[char];
    }
    
    if (node.isEndOfWord) {
      node.frequency++;
    }
  }

  /**
   * Get total number of unique words
   * @returns {number}
   */
  getWordCount() {
    return this.totalWords;
  }

  /**
   * Get Trie statistics
   * @returns {Object}
   */
  getStats() {
    const stats = {
      totalWords: this.totalWords,
      totalNodes: 0,
      maxDepth: 0
    };

    const countNodes = (node, depth) => {
      stats.totalNodes++;
      stats.maxDepth = Math.max(stats.maxDepth, depth);
      
      for (let char in node.children) {
        countNodes(node.children[char], depth + 1);
      }
    };

    countNodes(this.root, 0);
    return stats;
  }

  /**
   * Clear all data from Trie
   */
  clear() {
    this.root = new TrieNode();
    this.totalWords = 0;
  }
}

// Default word dictionary for initialization
export const DEFAULT_DICTIONARY = [
  { word: 'javascript', frequency: 150 },
  { word: 'java', frequency: 120 },
  { word: 'python', frequency: 180 },
  { word: 'programming', frequency: 100 },
  { word: 'algorithm', frequency: 90 },
  { word: 'data', frequency: 140 },
  { word: 'database', frequency: 85 },
  { word: 'structure', frequency: 75 },
  { word: 'development', frequency: 95 },
  { word: 'developer', frequency: 110 },
  { word: 'design', frequency: 88 },
  { word: 'designer', frequency: 72 },
  { word: 'application', frequency: 105 },
  { word: 'artificial', frequency: 92 },
  { word: 'intelligence', frequency: 88 },
  { word: 'machine', frequency: 78 },
  { word: 'learning', frequency: 95 },
  { word: 'network', frequency: 68 },
  { word: 'neural', frequency: 65 },
  { word: 'technology', frequency: 115 },
  { word: 'software', frequency: 125 },
  { word: 'hardware', frequency: 70 },
  { word: 'computer', frequency: 135 },
  { word: 'coding', frequency: 98 },
  { word: 'code', frequency: 145 },
  { word: 'function', frequency: 82 },
  { word: 'array', frequency: 76 },
  { word: 'string', frequency: 74 },
  { word: 'object', frequency: 85 },
  { word: 'class', frequency: 79 },
  { word: 'interface', frequency: 71 },
  { word: 'backend', frequency: 67 },
  { word: 'frontend', frequency: 89 },
  { word: 'fullstack', frequency: 63 },
  { word: 'framework', frequency: 77 },
  { word: 'library', frequency: 73 },
  { word: 'package', frequency: 65 },
  { word: 'module', frequency: 68 },
  { word: 'component', frequency: 81 },
  { word: 'element', frequency: 62 },
  { word: 'variable', frequency: 71 },
  { word: 'constant', frequency: 58 },
  { word: 'parameter', frequency: 61 },
  { word: 'argument', frequency: 59 },
  { word: 'return', frequency: 86 },
  { word: 'async', frequency: 72 },
  { word: 'await', frequency: 69 },
  { word: 'promise', frequency: 75 },
  { word: 'callback', frequency: 64 },
  { word: 'event', frequency: 77 },
  { word: 'listener', frequency: 56 },
  { word: 'handler', frequency: 63 },
  { word: 'method', frequency: 78 },
  { word: 'property', frequency: 66 },
  { word: 'attribute', frequency: 58 },
  { word: 'value', frequency: 91 },
  { word: 'key', frequency: 73 },
  { word: 'index', frequency: 68 },
  { word: 'query', frequency: 72 },
  { word: 'search', frequency: 94 },
  { word: 'filter', frequency: 67 },
  { word: 'sort', frequency: 63 },
  { word: 'map', frequency: 71 },
  { word: 'reduce', frequency: 57 },
  { word: 'foreach', frequency: 65 },
  { word: 'loop', frequency: 74 },
  { word: 'iteration', frequency: 55 },
  { word: 'recursive', frequency: 52 },
  { word: 'recursion', frequency: 54 },
  { word: 'algorithm', frequency: 76 },
  { word: 'optimization', frequency: 59 },
  { word: 'performance', frequency: 81 },
  { word: 'efficiency', frequency: 62 },
  { word: 'memory', frequency: 68 },
  { word: 'storage', frequency: 64 },
  { word: 'cache', frequency: 61 },
  { word: 'session', frequency: 58 },
  { word: 'cookie', frequency: 55 },
  { word: 'token', frequency: 67 },
  { word: 'authentication', frequency: 73 },
  { word: 'authorization', frequency: 64 },
  { word: 'security', frequency: 79 },
  { word: 'encryption', frequency: 61 },
  { word: 'validation', frequency: 68 },
  { word: 'error', frequency: 87 },
  { word: 'exception', frequency: 59 },
  { word: 'debug', frequency: 72 },
  { word: 'test', frequency: 84 },
  { word: 'testing', frequency: 76 },
  { word: 'unit', frequency: 62 },
  { word: 'integration', frequency: 58 },
  { word: 'deployment', frequency: 71 },
  { word: 'production', frequency: 74 },
  { word: 'environment', frequency: 66 },
  { word: 'configuration', frequency: 63 },
  { word: 'settings', frequency: 69 },
  { word: 'options', frequency: 65 },
  { word: 'preferences', frequency: 54 },
  { word: 'default', frequency: 71 },
  { word: 'custom', frequency: 68 },
  { word: 'template', frequency: 64 },
  { word: 'pattern', frequency: 61 },
  { word: 'model', frequency: 73 },
  { word: 'view', frequency: 76 },
  { word: 'controller', frequency: 67 },
  { word: 'service', frequency: 72 },
  { word: 'repository', frequency: 58 },
  { word: 'entity', frequency: 55 },
  { word: 'schema', frequency: 63 },
  { word: 'migration', frequency: 56 },
  { word: 'seed', frequency: 48 },
  { word: 'factory', frequency: 52 },
  { word: 'builder', frequency: 59 },
  { word: 'manager', frequency: 61 },
  { word: 'helper', frequency: 64 },
  { word: 'utility', frequency: 58 },
  { word: 'tool', frequency: 73 },
  { word: 'toolkit', frequency: 51 },
  { word: 'plugin', frequency: 62 },
  { word: 'extension', frequency: 59 },
  { word: 'addon', frequency: 47 },
  { word: 'widget', frequency: 56 },
  { word: 'feature', frequency: 78 },
  { word: 'functionality', frequency: 64 },
  { word: 'capability', frequency: 53 },
  { word: 'behavior', frequency: 57 },
  { word: 'action', frequency: 69 },
  { word: 'operation', frequency: 61 },
  { word: 'process', frequency: 74 },
  { word: 'procedure', frequency: 52 },
  { word: 'workflow', frequency: 63 },
  { word: 'pipeline', frequency: 58 },
  { word: 'stream', frequency: 61 },
  { word: 'buffer', frequency: 54 },
  { word: 'queue', frequency: 57 },
  { word: 'stack', frequency: 66 },
  { word: 'heap', frequency: 51 },
  { word: 'tree', frequency: 63 },
  { word: 'graph', frequency: 59 },
  { word: 'node', frequency: 72 },
  { word: 'edge', frequency: 48 },
  { word: 'vertex', frequency: 45 },
  { word: 'path', frequency: 68 },
  { word: 'route', frequency: 71 },
  { word: 'router', frequency: 66 },
  { word: 'navigate', frequency: 57 },
  { word: 'navigation', frequency: 64 },
  { word: 'link', frequency: 73 },
  { word: 'anchor', frequency: 49 },
  { word: 'button', frequency: 81 },
  { word: 'input', frequency: 88 },
  { word: 'output', frequency: 67 },
  { word: 'form', frequency: 79 },
  { word: 'field', frequency: 71 },
  { word: 'label', frequency: 64 },
  { word: 'placeholder', frequency: 58 },
  { word: 'tooltip', frequency: 52 },
  { word: 'modal', frequency: 69 },
  { word: 'dialog', frequency: 61 },
  { word: 'popup', frequency: 56 },
  { word: 'dropdown', frequency: 67 },
  { word: 'menu', frequency: 74 },
  { word: 'navbar', frequency: 63 },
  { word: 'sidebar', frequency: 59 },
  { word: 'footer', frequency: 66 },
  { word: 'header', frequency: 72 },
  { word: 'section', frequency: 68 },
  { word: 'container', frequency: 71 },
  { word: 'wrapper', frequency: 58 },
  { word: 'panel', frequency: 61 },
  { word: 'card', frequency: 76 },
  { word: 'tile', frequency: 51 },
  { word: 'grid', frequency: 69 },
  { word: 'flex', frequency: 73 },
  { word: 'layout', frequency: 74 },
  { word: 'responsive', frequency: 68 },
  { word: 'adaptive', frequency: 54 },
  { word: 'mobile', frequency: 77 },
  { word: 'desktop', frequency: 65 },
  { word: 'tablet', frequency: 56 },
  { word: 'device', frequency: 69 },
  { word: 'screen', frequency: 72 },
  { word: 'display', frequency: 74 },
  { word: 'render', frequency: 76 },
  { word: 'paint', frequency: 48 },
  { word: 'style', frequency: 81 },
  { word: 'css', frequency: 92 },
  { word: 'html', frequency: 98 },
  { word: 'dom', frequency: 71 },
  { word: 'browser', frequency: 78 },
  { word: 'window', frequency: 73 },
  { word: 'document', frequency: 76 },
  { word: 'element', frequency: 79 },
  { word: 'selector', frequency: 66 },
  { word: 'classname', frequency: 62 },
  { word: 'identifier', frequency: 54 },
  { word: 'tag', frequency: 68 },
  { word: 'attribute', frequency: 63 },
  { word: 'property', frequency: 71 },
  { word: 'animation', frequency: 74 },
  { word: 'transition', frequency: 69 },
  { word: 'transform', frequency: 64 },
  { word: 'translate', frequency: 57 },
  { word: 'rotate', frequency: 53 },
  { word: 'scale', frequency: 61 },
  { word: 'opacity', frequency: 59 },
  { word: 'visibility', frequency: 52 },
  { word: 'overflow', frequency: 58 },
  { word: 'scroll', frequency: 71 },
  { word: 'position', frequency: 68 },
  { word: 'absolute', frequency: 61 },
  { word: 'relative', frequency: 64 },
  { word: 'fixed', frequency: 59 },
  { word: 'static', frequency: 56 },
  { word: 'sticky', frequency: 52 },
  { word: 'float', frequency: 54 },
  { word: 'clear', frequency: 57 },
  { word: 'margin', frequency: 66 },
  { word: 'padding', frequency: 68 },
  { word: 'border', frequency: 71 },
  { word: 'radius', frequency: 63 },
  { word: 'shadow', frequency: 67 },
  { word: 'gradient', frequency: 64 },
  { word: 'color', frequency: 84 },
  { word: 'background', frequency: 79 },
  { word: 'foreground', frequency: 51 },
  { word: 'text', frequency: 86 },
  { word: 'font', frequency: 77 },
  { word: 'size', frequency: 73 },
  { word: 'weight', frequency: 64 },
  { word: 'height', frequency: 69 },
  { word: 'width', frequency: 72 },
  { word: 'length', frequency: 61 },
  { word: 'dimension', frequency: 48 },
  { word: 'coordinate', frequency: 52 },
  { word: 'axis', frequency: 54 },
  { word: 'vector', frequency: 57 },
  { word: 'matrix', frequency: 53 },
  { word: 'calculation', frequency: 59 },
  { word: 'compute', frequency: 61 },
  { word: 'execute', frequency: 63 },
  { word: 'run', frequency: 76 },
  { word: 'start', frequency: 71 },
  { word: 'stop', frequency: 64 },
  { word: 'pause', frequency: 57 },
  { word: 'resume', frequency: 52 },
  { word: 'continue', frequency: 58 },
  { word: 'break', frequency: 61 },
  { word: 'switch', frequency: 66 },
  { word: 'case', frequency: 63 },
  { word: 'condition', frequency: 67 },
  { word: 'if', frequency: 95 },
  { word: 'else', frequency: 89 },
  { word: 'then', frequency: 74 },
  { word: 'when', frequency: 68 },
  { word: 'while', frequency: 72 },
  { word: 'for', frequency: 87 },
  { word: 'do', frequency: 81 },
  { word: 'try', frequency: 79 },
  { word: 'catch', frequency: 76 },
  { word: 'finally', frequency: 61 },
  { word: 'throw', frequency: 64 },
  { word: 'new', frequency: 83 },
  { word: 'this', frequency: 91 },
  { word: 'self', frequency: 58 },
  { word: 'super', frequency: 54 },
  { word: 'extends', frequency: 59 },
  { word: 'implements', frequency: 52 },
  { word: 'import', frequency: 77 },
  { word: 'export', frequency: 74 },
  { word: 'require', frequency: 68 },
  { word: 'include', frequency: 61 },
  { word: 'exclude', frequency: 48 },
  { word: 'public', frequency: 66 },
  { word: 'private', frequency: 63 },
  { word: 'protected', frequency: 57 },
  { word: 'static', frequency: 64 },
  { word: 'final', frequency: 56 },
  { word: 'abstract', frequency: 51 },
  { word: 'virtual', frequency: 49 },
  { word: 'override', frequency: 53 },
  { word: 'overload', frequency: 47 },
  { word: 'inherit', frequency: 52 },
  { word: 'polymorphism', frequency: 43 },
  { word: 'encapsulation', frequency: 45 },
  { word: 'abstraction', frequency: 47 },
  { word: 'inheritance', frequency: 51 },
  { word: 'composition', frequency: 48 },
  { word: 'aggregation', frequency: 42 },
  { word: 'association', frequency: 44 },
  { word: 'dependency', frequency: 56 },
  { word: 'injection', frequency: 54 },
  { word: 'singleton', frequency: 49 },
  { word: 'factory', frequency: 53 },
  { word: 'observer', frequency: 48 },
  { word: 'strategy', frequency: 51 },
  { word: 'decorator', frequency: 52 },
  { word: 'adapter', frequency: 49 },
  { word: 'facade', frequency: 46 },
  { word: 'proxy', frequency: 51 },
  { word: 'bridge', frequency: 44 },
  { word: 'composite', frequency: 45 },
  { word: 'flyweight', frequency: 38 },
  { word: 'command', frequency: 57 },
  { word: 'iterator', frequency: 52 },
  { word: 'mediator', frequency: 43 },
  { word: 'memento', frequency: 39 },
  { word: 'state', frequency: 68 },
  { word: 'visitor', frequency: 41 },
  { word: 'chain', frequency: 49 },
  { word: 'responsibility', frequency: 44 },
  { word: 'interpreter', frequency: 42 },
  { word: 'template', frequency: 56 },
  { word: 'prototype', frequency: 51 },
  { word: 'builder', frequency: 54 },
  { word: 'clone', frequency: 53 },
  { word: 'copy', frequency: 67 },
  { word: 'duplicate', frequency: 48 },
  { word: 'create', frequency: 79 },
  { word: 'read', frequency: 76 },
  { word: 'update', frequency: 81 },
  { word: 'delete', frequency: 74 },
  { word: 'crud', frequency: 62 },
  { word: 'persist', frequency: 54 },
  { word: 'save', frequency: 78 },
  { word: 'load', frequency: 71 },
  { word: 'fetch', frequency: 77 },
  { word: 'retrieve', frequency: 59 },
  { word: 'get', frequency: 94 },
  { word: 'set', frequency: 88 },
  { word: 'put', frequency: 64 },
  { word: 'post', frequency: 72 },
  { word: 'patch', frequency: 56 },
  { word: 'options', frequency: 61 },
  { word: 'head', frequency: 48 },
  { word: 'request', frequency: 78 },
  { word: 'response', frequency: 81 },
  { word: 'status', frequency: 73 },
  { word: 'code', frequency: 84 },
  { word: 'message', frequency: 76 },
  { word: 'body', frequency: 68 },
  { word: 'header', frequency: 71 },
  { word: 'cookie', frequency: 59 },
  { word: 'session', frequency: 64 },
  { word: 'client', frequency: 74 },
  { word: 'server', frequency: 82 },
  { word: 'host', frequency: 63 },
  { word: 'port', frequency: 67 },
  { word: 'protocol', frequency: 61 },
  { word: 'http', frequency: 79 },
  { word: 'https', frequency: 76 },
  { word: 'ssl', frequency: 58 },
  { word: 'tls', frequency: 54 },
  { word: 'certificate', frequency: 56 },
  { word: 'key', frequency: 72 },
  { word: 'secret', frequency: 64 },
  { word: 'hash', frequency: 68 },
  { word: 'salt', frequency: 51 },
  { word: 'pepper', frequency: 42 },
  { word: 'encrypt', frequency: 63 },
  { word: 'decrypt', frequency: 57 },
  { word: 'encode', frequency: 61 },
  { word: 'decode', frequency: 59 },
  { word: 'serialize', frequency: 56 },
  { word: 'deserialize', frequency: 52 },
  { word: 'parse', frequency: 73 },
  { word: 'stringify', frequency: 64 },
  { word: 'format', frequency: 69 },
  { word: 'transform', frequency: 66 },
  { word: 'convert', frequency: 63 },
  { word: 'cast', frequency: 54 },
  { word: 'type', frequency: 79 },
  { word: 'typeof', frequency: 61 },
  { word: 'instanceof', frequency: 58 },
  { word: 'is', frequency: 87 },
  { word: 'has', frequency: 74 },
  { word: 'can', frequency: 68 },
  { word: 'should', frequency: 71 },
  { word: 'must', frequency: 64 },
  { word: 'will', frequency: 76 },
  { word: 'would', frequency: 59 },
  { word: 'could', frequency: 57 },
  { word: 'may', frequency: 62 },
  { word: 'might', frequency: 54 },
  { word: 'need', frequency: 73 },
  { word: 'want', frequency: 68 },
  { word: 'like', frequency: 71 },
  { word: 'prefer', frequency: 52 },
  { word: 'choose', frequency: 58 },
  { word: 'select', frequency: 69 },
  { word: 'pick', frequency: 51 },
  { word: 'find', frequency: 76 },
  { word: 'locate', frequency: 47 },
  { word: 'discover', frequency: 53 },
  { word: 'detect', frequency: 56 },
  { word: 'identify', frequency: 61 },
  { word: 'recognize', frequency: 54 },
  { word: 'match', frequency: 68 },
  { word: 'compare', frequency: 64 },
  { word: 'contrast', frequency: 48 },
  { word: 'differ', frequency: 51 },
  { word: 'equal', frequency: 66 },
  { word: 'equivalent', frequency: 47 },
  { word: 'same', frequency: 71 },
  { word: 'similar', frequency: 63 },
  { word: 'different', frequency: 68 },
  { word: 'unique', frequency: 66 },
  { word: 'distinct', frequency: 54 },
  { word: 'separate', frequency: 58 },
  { word: 'individual', frequency: 52 },
  { word: 'single', frequency: 69 },
  { word: 'multiple', frequency: 67 },
  { word: 'many', frequency: 73 },
  { word: 'few', frequency: 61 },
  { word: 'some', frequency: 76 },
  { word: 'any', frequency: 78 },
  { word: 'all', frequency: 84 },
  { word: 'none', frequency: 58 },
  { word: 'nothing', frequency: 54 },
  { word: 'everything', frequency: 61 },
  { word: 'something', frequency: 67 },
  { word: 'anything', frequency: 63 },
  { word: 'each', frequency: 71 },
  { word: 'every', frequency: 68 },
  { word: 'both', frequency: 64 },
  { word: 'either', frequency: 57 },
  { word: 'neither', frequency: 48 },
  { word: 'or', frequency: 91 },
  { word: 'and', frequency: 96 },
  { word: 'but', frequency: 73 },
  { word: 'not', frequency: 86 },
  { word: 'nor', frequency: 51 },
  { word: 'yet', frequency: 58 },
  { word: 'so', frequency: 74 },
  { word: 'because', frequency: 69 },
  { word: 'since', frequency: 63 },
  { word: 'although', frequency: 52 },
  { word: 'though', frequency: 56 },
  { word: 'unless', frequency: 49 },
  { word: 'until', frequency: 61 },
  { word: 'before', frequency: 68 },
  { word: 'after', frequency: 71 },
  { word: 'during', frequency: 59 },
  { word: 'between', frequency: 64 },
  { word: 'among', frequency: 48 },
  { word: 'within', frequency: 58 },
  { word: 'without', frequency: 63 },
  { word: 'inside', frequency: 54 },
  { word: 'outside', frequency: 51 },
  { word: 'above', frequency: 56 },
  { word: 'below', frequency: 58 },
  { word: 'over', frequency: 67 },
  { word: 'under', frequency: 61 },
  { word: 'through', frequency: 66 },
  { word: 'across', frequency: 53 },
  { word: 'along', frequency: 52 },
  { word: 'around', frequency: 59 },
  { word: 'beside', frequency: 44 },
  { word: 'behind', frequency: 51 },
  { word: 'beyond', frequency: 48 },
  { word: 'toward', frequency: 49 },
  { word: 'against', frequency: 57 },
  { word: 'upon', frequency: 52 },
  { word: 'into', frequency: 74 },
  { word: 'onto', frequency: 51 },
  { word: 'off', frequency: 64 },
  { word: 'out', frequency: 76 },
  { word: 'up', frequency: 81 },
  { word: 'down', frequency: 74 },
  { word: 'in', frequency: 92 },
  { word: 'on', frequency: 89 },
  { word: 'at', frequency: 86 },
  { word: 'by', frequency: 81 },
  { word: 'with', frequency: 88 },
  { word: 'from', frequency: 84 },
  { word: 'to', frequency: 95 },
  { word: 'as', frequency: 83 },
  { word: 'of', frequency: 94 },
];