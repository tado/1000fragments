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
        float ang = ff * 2.3999632 + t * 0.36 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.21 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.11) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.99;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.29; p = rot2(0.48) * p; }
	p = (floor(p * 25.8) + 0.5) / 25.8;
	{ p = vec2(atan(p.y, p.x) * 2.33, length(p) * 5.44 - time * 0.21); }
	p *= 2.37;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.48 + time * 0.17, vec3(0.42, 0.46, 0.40), vec3(0.43, 0.33, 0.38), vec3(1.05, 1.18, 1.08), vec3(0.23, 0.95, 0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
