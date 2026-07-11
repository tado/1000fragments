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
        float ang = ff * 2.3999632 + t * 0.25 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.24 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 9.11) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = (floor(p * 29.0) + 0.5) / 29.0;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.80 + time * 0.24, vec3(0.44, 0.56, 0.58), vec3(0.43, 0.43, 0.40), vec3(0.82, 1.05, 1.08), vec3(0.01, 0.39, 0.55));
	col = mod(col * 2.32, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
