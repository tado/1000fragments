uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.37, 0.0)) * 11.28 - t * 5.26 + ph);
    float mb = sin(length(p + vec2(0.37, 0.0)) * 9.40 - t * 6.31 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.84 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.23 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 6.67) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.65;
	p = rot2(p.y * 1.10 + time * 0.97) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.13);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.13 + time * 0.09, vec3(0.43, 0.42, 0.46), vec3(0.41, 0.39, 0.41), vec3(0.91, 1.10, 0.84), vec3(0.36, 0.66, 0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
