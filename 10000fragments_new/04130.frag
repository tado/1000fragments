uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 17.66 + t * 3.21 + ph) * 0.7;
    float wb = sin(p.y * 14.58 - t * 3.51 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.54;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.63;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.10, lr * 2.97 + time * -0.63); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.03), field(p, time, 2.05));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
