uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.28 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.30 + t * 2.98 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.66;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.07, lr * 2.16 + time * 0.61); }
	p += vec2(-0.09, -0.48) * sin(length(p) * 5.59 - time * 1.23) * 0.38;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.40, 0.35, 0.25) * (0.10 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col *= 0.83 + 0.20 * sin(gl_FragCoord.y * 2.57 + time * 8.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
