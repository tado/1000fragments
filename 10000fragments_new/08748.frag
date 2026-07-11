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
    vec2 wq = vec2(vnoise2(p * 3.22 + ph), vnoise2(p * 3.22 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.22 + 2.36 * wq + vec2(1.7, 9.2) + t * 0.67),
                   vnoise2(p * 3.22 + 1.36 * wq + vec2(8.3, 2.8) - t * 0.54));
    v = vnoise2(p * 3.22 + 2.73 * wr) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.16 + t * 5.51 + ph) + sin(p.y * 3.04 - t * 3.60 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.13, -0.34) * sin(length(p) * 3.03 - time * 1.36) * 0.38;
	{ float fr = length(p); p *= 1.0 + 0.50 * fr * fr; }
	p = rot2(p.y * 1.37 + time * 0.76) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.26);
	float d = d1 * d2;
	vec3 col = palette(d * 1.55 + time * 0.17, vec3(0.54, 0.47, 0.52), vec3(0.38, 0.49, 0.43), vec3(1.11, 0.75, 0.79), vec3(0.30, 0.34, 0.08));
	col = clamp((col - 0.5) * 1.39 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
