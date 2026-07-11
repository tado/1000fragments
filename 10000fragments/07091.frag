uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.50, t * 1.61 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.22;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.39, lr * 2.45 + time * -0.50); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.69), field(p, time, 1.39));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.53, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
