uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.97 + sin(p.y * 3.47 + t * 4.06) * 3.10 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.49, lr * 1.18 + time * -0.48); }
	p = fract(p * 2.70) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.69 + time * 0.05, vec3(0.42, 0.60, 0.47), vec3(0.49, 0.48, 0.49), vec3(0.89, 0.85, 0.97), vec3(0.41, 0.19, 0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
