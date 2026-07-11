uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.91 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.39 + t * 2.00 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.40), cos(time * 1.41)) * 0.18;
	float an = atan(p.y, p.x) + time * 0.24;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.93 / 3.1415927, 0.92 / r + time * 0.66);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.26, 0.39, 0.86) * (0.16 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= clamp(r * 1.09, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
