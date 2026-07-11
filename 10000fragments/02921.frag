uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.46 + vec2(t * 2.11, -t * 2.11) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.92;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.38, lr * 2.33 + time * 0.24); }
	p += vec2(0.34, -0.29) * sin(length(p) * 4.30 - time * 0.73) * 0.34;
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.81), field(p, time, 1.63));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.59);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
