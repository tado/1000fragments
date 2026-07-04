uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.69 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.04 + t * 3.27 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.89, lr * 2.23 + time * -0.47); }
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.94;
	p *= 1.85;
	p += vec2(-0.46, 0.70) * sin(length(p) * 4.40 - time * 1.45) * 0.14;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.87), field(p, time, 1.74));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.84 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
