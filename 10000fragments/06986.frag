uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.36, t * 1.34 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.37;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.30, lr * 1.06 + time * -0.32); }
	p = rot2(p.y * 3.37 + time * 0.28) * p;
	p = rot2(time * -0.27) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.29), field(p, time, 2.57));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
