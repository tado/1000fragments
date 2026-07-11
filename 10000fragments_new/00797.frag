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
    vec2 cw = p * 3.83 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.11 + t * 3.30 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 19.24);
    float gsh = hash21(vec2(grow, floor(t * 4.38))) - 0.5;
    float gx = p.x + gsh * 0.38;
    v = sin(gx * 9.32 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.46));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.49;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(p.y * 1.81 + time * 0.80) * p;
	p.x += sin(p.y * 6.20 + time * 3.79) * 0.22;
	p += vec2(0.91, -0.54) * sin(length(p) * 2.33 - time * 2.19) * 0.26;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.43);
	float d = d1 * d2;
	vec3 col = palette(d * 0.67 + time * 0.07, vec3(0.40, 0.52, 0.57), vec3(0.39, 0.40, 0.44), vec3(0.82, 0.95, 1.24), vec3(0.53, 0.10, 0.77));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
