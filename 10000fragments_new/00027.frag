uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.53 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.13 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 7.94) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.25;
	p += vec2(0.42, -0.15) * sin(length(p) * 3.94 - time * 2.24) * 0.27;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.98, 0.32, 0.95) * (0.08 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= 0.88 + 0.19 * sin(gl_FragCoord.y * 1.86 + time * 13.85);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
