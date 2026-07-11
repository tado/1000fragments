uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.73 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.12 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 5.48) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * 2.62 + time * 0.54) * p;
	p = fract(p * 2.69) - 0.5;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.13; p = rot2(2.51) * p; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.79, 1.24, 0.74) + vec3(0.24, 0.06, 0.02);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
