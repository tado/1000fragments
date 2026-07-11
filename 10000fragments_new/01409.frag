uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.29 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.24 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 10.94) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p.y += sin(p.x * 7.63 + time * 2.38) * 0.23;
	{ p = vec2(atan(p.y, p.x) * 2.28, length(p) * 5.34 - time * 0.49); }
	p = (floor(p * 13.9) + 0.5) / 13.9;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.65 + time * 0.06, vec3(0.55, 0.57, 0.47), vec3(0.33, 0.40, 0.31), vec3(1.29, 1.12, 1.40), vec3(0.11, 0.08, 0.78));
	col *= 0.90 + 0.11 * sin(gl_FragCoord.y * 2.03 + time * 7.48);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
