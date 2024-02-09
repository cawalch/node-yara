{
  "targets": [
    {
      "target_name": "yara",
      "sources": [
        "src/yara.cc"
      ],
      "cflags_cc!": [
        "-fno-exceptions",
        "-fno-rtti"
      ],
      "include_dirs": [
        "<!(node -e 'require(\"nan\")')",
        "./build/yara/include",
        "<!@(if [ `uname -m` = 'x86_64' ]; then echo '/usr/local/include'; else echo '/opt/homebrew/include'; fi)"
      ],
      "libraries": [
        "-lmagic",
        "../build/yara/lib/libyara.a",
        "<!@(if [ `uname -m` = 'x86_64' ]; then echo '-L/usr/local/lib'; else echo '-L/opt/homebrew/lib'; fi)",
        "<!@(if [ -d /opt/homebrew/opt/libmagic/lib ]; then echo '-L/opt/homebrew/opt/libmagic/lib'; fi)"
      ],
      "conditions": [
        [
          "OS==\"mac\"",
          {
            "xcode_settings": {
              "GCC_ENABLE_CPP_EXCEPTIONS": "YES"
            }
          }
        ]
      ],
      "actions": [
        {
          "action_name": "build_libyara",
          "inputs": [
            "deps"
          ],
          "outputs": [
            "build/yara"
          ],
          "action": [
            "make",
            "libyara"
          ]
        }
      ]
    }
  ]
}
