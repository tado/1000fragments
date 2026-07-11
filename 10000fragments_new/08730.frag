uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 7.65;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.47)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 20.74 - t * 3.59 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.52 + sin(p.y * 3.03 + t * 3.89) * 2.01 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 7.32;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.14)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 13.27 - t * 5.97 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.87;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.83, lr * 2.22 + time * 0.22); }
	q1 = abs(q1) - 0.25;
	q2.x += sin(q2.y * 2.00 + time * 1.07) * 0.13;
	q2 = fract(q2 * 2.29) - 0.5;
	q3 = rot2(q3.y * 2.93 + time * 0.41) * q3;
	{ q3 = vec2(atan(q3.y, q3.x) * 1.00, length(q3) * 2.96 - time * 0.36); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.88);
	float d3 = fieldC(q3, time, 0.93);
	d2 = min(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 0.74 + time * 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
