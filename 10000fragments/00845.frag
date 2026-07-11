uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.89 + sin(p.y * 5.98 + t * 1.38) * 4.21 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.37;
	p += vec2(-0.10, 0.23) * sin(length(p) * 4.51 - time * 0.87) * 0.22;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.14, lr * 1.03 + time * -0.36); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.63 + time * 0.11, vec3(0.44, 0.48, 0.45), vec3(0.44, 0.42, 0.43), vec3(1.10, 1.05, 1.19), vec3(0.96, 0.61, 0.78));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
