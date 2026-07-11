uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.65, t * 2.11 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.33, lr * 1.74 + time * 0.76); }
	{ float fr = length(p); p *= 1.0 + 0.26 * fr * fr; }
	p += vec2(-0.05, 0.16) * sin(length(p) * 5.91 - time * 0.77) * 0.13;
	p *= 2.89;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.85), field(p, time, 1.69));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
