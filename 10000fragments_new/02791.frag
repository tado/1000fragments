uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.60 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.27 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 6.29) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.29;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.42; p = rot2(1.39) * p; }
	p = abs(p) - 0.74;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.97, 0.97, 0.98) * (0.17 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = fract(col * 1.35);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
