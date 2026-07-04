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
        float ang = ff * 2.3999632 + t * 0.56 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.17 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 4.98) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.30;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.14) * p * 18.66;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.65;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = palette(d * 1.25 + time * 0.19, vec3(0.40, 0.52, 0.42), vec3(0.44, 0.31, 0.31), vec3(0.95, 1.33, 0.93), vec3(0.23, 0.64, 0.10)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
