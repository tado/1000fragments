uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.92 + sr * 19.72 - t * 1.12 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.10;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.10, lr * 1.62 + time * 0.30); }
	{ p = vec2(atan(p.y, p.x) * 2.25, length(p) * 2.10 - time * 0.75); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.52), field(p, time, 1.03));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
