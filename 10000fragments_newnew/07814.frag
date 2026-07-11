uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.74 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.72 + t * 3.81 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.14), cos(time * 0.49)) * 0.15;
	float an = atan(p.y, p.x) + time * -0.12;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.97 / 3.1415927, 1.38 / r - time * 0.82);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.29 + time * 0.62);
	col *= clamp(r * 1.98, 0.0, 1.0);
	col *= 0.80 + 0.18 * sin(gl_FragCoord.y * 1.47 + time * 13.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
