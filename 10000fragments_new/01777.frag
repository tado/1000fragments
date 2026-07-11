uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.27) - 0.5;
    float rad = 0.25 + 0.12 * sin(t * 1.45 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.77 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.19 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 4.49) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.25;
	p = rot2(p.y * -2.70 + time * 0.59) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 3.74 * p.y + time * 0.85); p.y += 0.30 / wf * cos(wf * 2.94 * p.x + time * 0.60); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.20; p = rot2(1.86) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.08);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.79 + time * 0.24, vec3(0.45, 0.57, 0.40), vec3(0.49, 0.40, 0.42), vec3(1.29, 1.30, 1.03), vec3(0.39, 0.79, 0.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
