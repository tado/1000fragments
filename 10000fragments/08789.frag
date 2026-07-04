uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.77 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.23 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 10.37) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.47; p = rot2(1.18) * p; }
	p = (floor(p * 7.8) + 0.5) / 7.8;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.23, 0.35, 0.10), vec3(0.98, 0.64, 0.68), d);
	col = fract(col * 1.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
