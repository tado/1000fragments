uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 6.75 + t * 3.01 + ph) * 0.7;
    float wb = sin(p.y * 6.93 - t * 1.67 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.41;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 7.95;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.24)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 27.13 - t * 4.14 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 1.58) * p;
	p = fract(p * 2.20) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.09, lr * 2.68 + time * 0.74); }
	p *= 3.07;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.55);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.79 + time * 0.16, vec3(0.44, 0.53, 0.53), vec3(0.49, 0.35, 0.46), vec3(1.05, 1.28, 1.28), vec3(0.69, 0.78, 0.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
