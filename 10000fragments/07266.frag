uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.88 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.60 + t * 2.04 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.64), cos(time * 1.30)) * 0.19;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.74 / 3.1415927, 0.46 / r + time * 1.51);
	tv.x += tv.y * 0.11;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.42 + time * 0.09);
	col *= clamp(r * 1.75, 0.0, 1.0);
	col = fract(col * 2.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
