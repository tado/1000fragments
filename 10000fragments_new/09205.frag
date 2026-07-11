uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 8.50 + t * 1.92 + ph) * 0.7;
    float wb = sin(p.y * 16.72 - t * 3.02 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.58;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.72;
	p += vec2(-0.10, -0.58) * sin(length(p) * 2.09 - time * 2.35) * 0.23;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.50, lr * 2.84 + time * 0.82); }
	p = fract(p * 1.99) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.44, 0.78, 0.28) * (0.16 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
