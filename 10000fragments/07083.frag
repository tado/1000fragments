uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.51, t * 1.99 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.70;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.02, lr * 1.28 + time * -0.36); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.71 + time * 0.06, vec3(0.43, 0.46, 0.43), vec3(0.45, 0.46, 0.39), vec3(1.34, 1.26, 0.82), vec3(0.34, 1.00, 0.31));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
