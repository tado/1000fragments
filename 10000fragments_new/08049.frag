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
    vec2 wq = vec2(vnoise2(p * 4.13 + ph), vnoise2(p * 4.13 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.13 + 1.19 * wq + vec2(1.7, 9.2) + t * 0.37),
                   vnoise2(p * 4.13 + 2.83 * wq + vec2(8.3, 2.8) - t * 0.63));
    v = vnoise2(p * 4.13 + 1.02 * wr) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.31 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.16 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.96) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.88;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.31, lr * 1.33 + time * 0.78); }
	p = rot2(length(p) * 1.74 + time * 1.23) * p;
	p = abs(p) - 0.63;
	p = rot2(2.70) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.63);
	float d = d1 + d2;
	vec3 col = palette(d * 1.35 + time * 0.14, vec3(0.58, 0.47, 0.57), vec3(0.46, 0.33, 0.40), vec3(1.04, 0.88, 1.07), vec3(0.79, 0.10, 0.60));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
