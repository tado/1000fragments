uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 8.51 - t * 3.99 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.57;
	p *= 3.19;
	{ p = vec2(atan(p.y, p.x) * 1.43, length(p) * 5.18 - time * 0.70); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.95, lr * 2.30 + time * -0.31); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.87 + time * 0.24, vec3(0.49, 0.56, 0.49), vec3(0.38, 0.47, 0.49), vec3(1.22, 1.32, 0.78), vec3(0.67, 0.22, 0.66));
	col = fract(col * 1.34);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
