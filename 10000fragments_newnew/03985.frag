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
    float wr = length(p) + 0.22 * vnoise2(p * 2.18 + t * 0.45);
    v = sin(wr * 26.13 - t * 2.13 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.62 + 0.28 * cos(sa * 4.0 + t * 2.84 + ph);
    v = sin((sr - petal) * 16.45);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 0.85) * p;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 1.00; }
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.66));
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.12);
	float d = d1 * d2;
	vec3 col = palette(d * 1.33 + time * 0.09, vec3(0.58, 0.45, 0.55), vec3(0.42, 0.49, 0.33), vec3(0.76, 0.76, 0.87), vec3(0.62, 0.38, 0.88));
	col = mod(col * 2.88, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
