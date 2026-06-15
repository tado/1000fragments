uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.21 + sin(p.y * 4.37 + t * 4.28) * 3.08 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.46;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.71, lr * 2.18 + time * -0.10); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.86 + time * 0.18, vec3(0.55, 0.47, 0.58), vec3(0.46, 0.40, 0.35), vec3(1.21, 0.71, 0.97), vec3(0.77, 0.44, 0.75));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.21));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
