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
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 1.64 + ph), vnoise2(p * 1.64 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.64 + 1.39 * wq + vec2(1.7, 9.2) + t * 0.80),
                   vnoise2(p * 1.64 + 2.03 * wq + vec2(8.3, 2.8) - t * 0.73));
    v = vnoise2(p * 1.64 + 3.42 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.85;
	{ float fr = length(p); p *= 1.0 + 0.73 * fr * fr; }
	p = rot2(1.83) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.08, lr * 1.37 + time * 0.21); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.30 + time * 0.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
