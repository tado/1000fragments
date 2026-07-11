uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.50 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.67 + t * 1.72 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.21), cos(time * 1.29)) * 0.27;
	float an = atan(p.y, p.x) + time * -0.51;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.60 / 3.1415927, 1.39 / r + time * 1.15);
	tv.x += tv.y * 0.45;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.24, 0.16, 0.41) * (0.22 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col *= clamp(r * 1.72, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
