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
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.69 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.14 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 5.16) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 19.27);
    float gsh = hash21(vec2(grow, floor(t * 2.22))) - 0.5;
    float gx = p.x + gsh * 0.94;
    v = sin(gx * 16.95 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.76));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.36;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.17; p = rot2(1.05) * p; }
	p.y += sin(p.x * 3.37 + time * 1.76) * 0.34;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.68);
	float d = d1 + d2;
	vec3 col = palette(d * 0.81 + time * 0.03, vec3(0.41, 0.49, 0.42), vec3(0.38, 0.39, 0.48), vec3(0.89, 1.10, 1.27), vec3(0.63, 0.13, 0.82));
	col = mod(col * 2.24, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
