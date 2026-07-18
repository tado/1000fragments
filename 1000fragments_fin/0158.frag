uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.42 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.29 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.94) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.25;
	p = abs(p);
	p = (floor(p * 21.6) + 0.5) / 21.6;
	p += vec2(-0.63, 0.73) * sin(length(p) * 2.33 - (time * 0.91) * 2.17) * 0.27;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.42; p = rot2(0.46) * p; }
	float d = 0.5 + 0.5 * field(p, (time * 0.91), 0.0);
	vec3 col = mix(vec3(0.148, 0.048, 0.169), vec3(0.702, 0.970, 0.815), d);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(1.008, 0.996, 1.012);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.26 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
