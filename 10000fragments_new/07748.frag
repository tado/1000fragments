uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 3.0 + qr * 6.67 * sin(t * 1.13) + t * 2.07 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.91 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.15 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 10.69) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.04;
	p = rot2(2.20) * p;
	p = rot2(time * 0.83) * p;
	p.y += sin(p.x * 2.72 + time * 3.88) * 0.31;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.55; p = rot2(0.39) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.12);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.33 + time * 0.15, vec3(0.46, 0.40, 0.54), vec3(0.48, 0.35, 0.44), vec3(0.94, 1.25, 0.84), vec3(0.69, 0.66, 0.04));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.03 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
