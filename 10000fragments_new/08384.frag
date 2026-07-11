uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.68 + ph), vnoise2(p * 4.68 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.68 + 2.26 * wq + vec2(1.7, 9.2) + t * 1.08),
                   vnoise2(p * 4.68 + 3.68 * wq + vec2(8.3, 2.8) - t * 1.08));
    v = vnoise2(p * 4.68 + 1.19 * wr) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 7.0 + qr * 7.40 * sin(t * 1.33) + t * 5.08 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.22;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.58, lr * 1.70 + time * -0.62); }
	{ p = vec2(atan(p.y, p.x) * 1.31, length(p) * 3.56 - time * 0.32); }
	p = rot2(length(p) * -3.29 + time * 0.66) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.61);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.71 + time * 0.06, vec3(0.44, 0.41, 0.45), vec3(0.37, 0.31, 0.47), vec3(1.08, 0.98, 1.01), vec3(0.55, 0.63, 0.34));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
