
BASE=$(shell pwd)
OSNAME=$(shell uname)

CFGOPTS += --with-crypto
CFGOPTS += --enable-magic

ifeq ($(OSNAME),Darwin)
CFLAGS  += -I/usr/local/include/node
CFLAGS  += -I/usr/local/include
LDFLAGS += -L/usr/local/lib

# Check if /opt/homebrew/include exists and add it to CFLAGS
LIBMAGIC_INCLUDE_PATH := $(wildcard /opt/homebrew/opt/libmagic/include)
ifneq ($(LIBMAGIC_INCLUDE_PATH),)
CFLAGS += -I$(LIBMAGIC_INCLUDE_PATH)
endif

# Check if /opt/homebrew/lib exists and add it to LDFLAGS
LIBMAGIC_LIB_PATH := $(wildcard /opt/homebrew/opt/libmagic/lib)
ifneq ($(LIBMAGIC_LIB_PATH),)
LDFLAGS += -L$(LIBMAGIC_LIB_PATH)
endif

OPENSSL_LIB_PATH := $(wildcard /opt/homebrew/opt/openssl@3/lib)
ifneq ($(OPENSSL_LIB_PATH),)
LDFLAGS += -L$(OPENSSL_LIB_PATH)
endif

OPENSSL_INCLUDE_PATH := $(wildcard /opt/homebrew/opt/openssl@3/include)
ifneq ($(OPENSSL_INCLUDE_PATH),)
CFLAGS += -I$(OPENSSL_INCLUDE_PATH)
endif

ifeq ($(ARCH),arm64)
CFLAGS += -I/opt/homebrew/include
LDFLAGS += -L/opt/homebrew/lib
endif

endif 

YARA?=4.2.3

libyara: yara

yara:
	-rm -rf $(BASE)/build/yara
	-rm -rf $(BASE)/deps/yara-$(YARA)
	test -f $(BASE)/deps/yara-$(YARA).tar.gz || curl -L -k https://github.com/VirusTotal/yara/archive/v$(YARA).tar.gz > $(BASE)/deps/yara-$(YARA).tar.gz
	cd $(BASE)/deps && tar -xzvf yara-$(YARA).tar.gz
	cd $(BASE)/deps/yara-$(YARA) && ./bootstrap.sh
	cd $(BASE)/deps/yara-$(YARA) && \
			CFLAGS="$(CFLAGS)" \
			LDFLAGS="$(LDFLAGS)" \
			./configure \
					$(CFGOPTS) \
					--enable-static \
					--disable-shared \
					--with-pic \
					--prefix=$(BASE)/build/yara
	cd $(BASE)/deps/yara-$(YARA) && make
	cd $(BASE)/deps/yara-$(YARA) && make install
