uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.30 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.85 + t * 1.63 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.74), cos(time * 1.36)) * 0.21;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.58 / 3.1415927, 1.14 / r - time * 2.27);
	tv.x += tv.y * 0.24;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.82, 0.98, 0.33) * (0.19 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= clamp(r * 1.57, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
