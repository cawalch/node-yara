#ifndef YARA_H
#define YARA_H

#include <mutex>

#include <nan.h>

#include <yara.h>

using namespace v8;

namespace yara {

void ExportConstants(Local<Object> target);
void ExportFunctions(Local<Object> target);

NAN_METHOD(ErrorCodeToString);
NAN_METHOD(LibyaraVersion);
NAN_METHOD(Initialize);

class ScannerWrap : public Nan::ObjectWrap {
public:
	static void Init(Local<Object> exports);

	YR_COMPILER* compiler;
	YR_RULES* rules;

	std::mutex mutex;

private:
	ScannerWrap();
	~ScannerWrap();

	static NAN_METHOD(New);
	static NAN_METHOD(Configure);
	static NAN_METHOD(Scan);
	static NAN_METHOD(GetRules);
	static NAN_METHOD(ReconfigureVariables);
};

}; /* namespace yara */

#endif /* YARA_H */
