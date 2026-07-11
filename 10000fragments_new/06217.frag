uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.87 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.15 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.05) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.35;
	p += vec2(0.22, 0.45) * sin(length(p) * 2.40 - time * 2.40) * 0.35;
	p = rot2(length(p) * -3.68 + time * 1.13) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.42; p = rot2(0.46) * p; }
	p = abs(p) - 0.53;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.94 + time * 0.26, vec3(0.54, 0.57, 0.40), vec3(0.49, 0.44, 0.37), vec3(1.03, 1.32, 1.04), vec3(0.53, 0.55, 0.67));
	col = mod(col * 2.62, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
