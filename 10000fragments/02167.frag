uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.48 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.10 + t * 2.86 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.47;
	{ p = vec2(atan(p.y, p.x) * 1.88, length(p) * 4.51 - time * 0.49); }
	p *= 1.0 + 0.40 * sin(time * 2.19);
	p = fract(p * 2.79) - 0.5;
	p = sin(p * 1.30 + time * 0.79) * 1.25;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.00, 0.37, 0.24), vec3(0.91, 0.91, 0.91), d);
	col = fract(col * 2.46);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
