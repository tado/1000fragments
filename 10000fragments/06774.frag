uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.26, t * 2.00 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.51 + t * 1.10 + ph) + sin(p.y * 7.36 - t * 5.10 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.51;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.89, lr * 1.10 + time * -0.47); }
	p = abs(p);
	p = fract(p * 2.35) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.99);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.75 + time * 0.28, vec3(0.53, 0.57, 0.44), vec3(0.42, 0.49, 0.30), vec3(1.19, 0.98, 0.92), vec3(0.95, 0.40, 0.25));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
