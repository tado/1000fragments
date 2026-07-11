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
    vec2 wq = vec2(vnoise2(p * 3.56 + ph), vnoise2(p * 3.56 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.56 + 1.64 * wq + vec2(1.7, 9.2) + t * 0.45),
                   vnoise2(p * 3.56 + 1.89 * wq + vec2(8.3, 2.8) - t * 0.56));
    v = vnoise2(p * 3.56 + 1.58 * wr) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 12.18 - t * 2.71 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.12;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.64, lr * 1.20 + time * -0.73); }
	p = rot2(time * -1.48) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.13);
	float d = d1 + d2;
	vec3 col = palette(d * 0.52 + time * 0.14, vec3(0.51, 0.54, 0.55), vec3(0.45, 0.37, 0.33), vec3(1.08, 0.73, 0.76), vec3(0.80, 0.99, 0.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
