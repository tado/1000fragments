uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.69 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.12 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.22) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.37;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.58, 0.60, 0.17) * (0.07 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= 0.87 + 0.17 * sin(gl_FragCoord.y * 2.04 + time * 11.87);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
