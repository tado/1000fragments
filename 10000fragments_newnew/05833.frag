uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.66 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.13 + t * 1.12 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.34;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.25 / 3.1415927, 0.41 / r + time * 2.27);
	tv.x += tv.y * 0.30;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.63 + time * 0.46);
	col *= clamp(r * 2.60, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
