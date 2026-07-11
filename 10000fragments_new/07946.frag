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

float field(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.68 + ph), vnoise2(p * 2.68 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.68 + 2.74 * wq + vec2(1.7, 9.2) + t * 0.97),
                   vnoise2(p * 2.68 + 2.04 * wq + vec2(8.3, 2.8) - t * 0.34));
    v = vnoise2(p * 2.68 + 3.45 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.60, lr * 2.32 + time * 0.78); }
	p = rot2(time * 1.33) * p;
	{ float fr = length(p); p *= 1.0 + -0.62 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.34, 0.57, 0.92) + vec3(0.19, 0.26, 0.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
