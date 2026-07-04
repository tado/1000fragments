uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 5.02 + t * 1.56 + ph) * 0.7;
    float wb = sin(p.y * 5.21 - t * 3.26 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.38;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.16;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.50, lr * 2.96 + time * -0.88); }
	p *= 2.02;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.43, 1.07, 1.21) + vec3(0.04, 0.10, 0.09);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
