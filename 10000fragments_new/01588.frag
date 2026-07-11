uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.29 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.85 + t * 1.89 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.62), cos(time * 1.08)) * 0.21;
	float an = atan(p.y, p.x) + time * -0.75;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.70 / 3.1415927, 0.64 / r - time * 1.09);
	tv.x += tv.y * 0.35;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.75 + time * 0.16);
	col *= clamp(r * 1.06, 0.0, 1.0);
	col = mod(col * 1.39, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
