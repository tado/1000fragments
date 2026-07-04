uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.31 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.36 + t * 2.26 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.17), cos(time * 1.41)) * 0.09;
	float an = atan(p.y, p.x) + time * 0.76;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.11 / 3.1415927, 1.04 / r - time * 1.25);
	tv.x += tv.y * 0.29;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.27, 0.83, 0.85) * (0.05 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= clamp(r * 1.15, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.64 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
