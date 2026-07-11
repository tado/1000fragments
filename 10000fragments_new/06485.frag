uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.79, t * 1.56 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.09;
	p = (floor(p * 10.7) + 0.5) / 10.7;
	{ p = vec2(atan(p.y, p.x) * 1.99, length(p) * 4.08 - time * 0.81); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.11, lr * 1.63 + time * 0.92); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.78 + time * 0.13, vec3(0.42, 0.47, 0.46), vec3(0.48, 0.44, 0.43), vec3(1.07, 0.77, 1.16), vec3(0.30, 0.64, 0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
