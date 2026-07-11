uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.96 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.94 + t * 2.12 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.80;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.12 / 3.1415927, 0.94 / r + time * 1.69);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.71, 0.25, 0.95) * (0.13 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= clamp(r * 1.98, 0.0, 1.0);
	col = fract(col * 1.64);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
