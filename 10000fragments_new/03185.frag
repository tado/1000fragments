uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.06 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.53 + t * 1.93 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.13), cos(time * 1.04)) * 0.23;
	float an = atan(p.y, p.x) + time * -0.62;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.23 / 3.1415927, 0.67 / r + time * 2.74);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.13, 0.33, 0.50), vec3(0.63, 0.56, 0.72), cc);
	col *= clamp(r * 2.50, 0.0, 1.0);
	col = fract(col * 1.60);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
