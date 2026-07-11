uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.14 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.38 + t * 3.89 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.12), cos(time * 0.82)) * 0.16;
	float an = atan(p.y, p.x) + time * -0.22;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.77 / 3.1415927, 1.47 / r - time * 2.53);
	tv.x += tv.y * 0.49;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.01, 0.01, 0.19), vec3(0.80, 0.77, 1.00), cc);
	col *= clamp(r * 1.49, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
