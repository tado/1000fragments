uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.85 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.27 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 5.67) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.07;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.84) * p * 22.54;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.52;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = mix(vec3(0.04, 0.12, 0.00), vec3(0.95, 0.79, 0.86), v);
	col = mod(col * 2.59, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
