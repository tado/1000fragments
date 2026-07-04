uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.07 + t * 4.83 + ph) + sin(p.y * 15.55 - t * 5.20 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.44 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.75, lr * 2.90 + time * -0.98); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.40), field(p, time, 0.81));
	col = 0.5 + 0.5 * col;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.42 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
