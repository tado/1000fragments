uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.35 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.44 + t * 3.87 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.04), cos(time * 1.05)) * 0.24;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.28 / 3.1415927, 0.73 / r + time * 2.98);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.20, 0.85, 0.81) * (0.12 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col *= clamp(r * 2.81, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
