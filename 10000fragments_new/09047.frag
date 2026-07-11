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
    vec2 wq = vec2(vnoise2(p * 4.10 + ph), vnoise2(p * 4.10 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.10 + 2.89 * wq + vec2(1.7, 9.2) + t * 0.80),
                   vnoise2(p * 4.10 + 3.36 * wq + vec2(8.3, 2.8) - t * 0.89));
    v = vnoise2(p * 4.10 + 3.30 * wr) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.52 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.44 + t * 1.11 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(2.28) * p;
	p = (floor(p * 7.5) + 0.5) / 7.5;
	p = rot2(p.y * 3.78 + time * 1.06) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.46);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.01 + time * 0.20, vec3(0.51, 0.51, 0.51), vec3(0.39, 0.33, 0.33), vec3(0.73, 0.85, 1.06), vec3(0.37, 0.51, 0.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
