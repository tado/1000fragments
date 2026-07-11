uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 1.50 + ph), sin(lt * 5.0 + t * 1.38)) * 0.60;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.52) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.48 + 0.17 * cos(sa * 4.0 + t * 1.06 + ph);
    v = sin((sr - petal) * 15.17);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 2.25, lr * 1.87 + time * 0.65); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.39);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.90 + time * 0.14, vec3(0.42, 0.60, 0.43), vec3(0.48, 0.35, 0.35), vec3(1.28, 0.92, 1.07), vec3(0.84, 0.19, 0.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
