uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.85 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.65 + t * 2.46 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.70), cos(time * 0.59)) * 0.22;
	float an = atan(p.y, p.x) + time * 0.44;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.06 / 3.1415927, 1.20 / r + time * 1.35);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.45 + time * 0.20);
	col *= clamp(r * 1.00, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
