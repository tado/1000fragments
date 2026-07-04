uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.03 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.99 + t * 3.56 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.33), cos(time * 0.59)) * 0.14;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.39 / 3.1415927, 0.85 / r + time * 2.92);
	tv.x += tv.y * 0.14;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.12, 0.05, 0.24), vec3(0.83, 0.96, 0.89), cc);
	col *= clamp(r * 2.46, 0.0, 1.0);
	col *= 0.83 + 0.18 * sin(gl_FragCoord.y * 2.03 + time * 8.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
