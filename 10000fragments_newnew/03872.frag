uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.36 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.99 + t * 3.37 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.97), cos(time * 1.34)) * 0.07;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.40 / 3.1415927, 1.23 / r - time * 0.94);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.59, 0.62, 0.57) * (0.11 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col *= clamp(r * 2.38, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
