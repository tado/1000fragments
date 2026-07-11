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
    vec2 wq = vec2(vnoise2(p * 3.12 + ph), vnoise2(p * 3.12 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.12 + 3.12 * wq + vec2(1.7, 9.2) + t * 0.48),
                   vnoise2(p * 3.12 + 1.33 * wq + vec2(8.3, 2.8) - t * 0.50));
    v = vnoise2(p * 3.12 + 2.33 * wr) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.59 + 0.19 * pow(abs(cos(ra * 4.0 + t * 1.31)), 1.86);
    v = sin((rr - pet) * 8.20 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.23;
	p = rot2(time * -1.53) * p;
	{ p = vec2(atan(p.y, p.x) * 2.81, length(p) * 3.53 - time * 0.27); }
	p = rot2(p.y * 3.95 + time * 0.70) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.15);
	float d = d1 * d2;
	vec3 col = palette(d * 0.59 + time * 0.24, vec3(0.40, 0.49, 0.44), vec3(0.45, 0.38, 0.47), vec3(1.34, 0.96, 0.91), vec3(0.10, 0.25, 0.66));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
