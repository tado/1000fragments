uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.65 + 0.20 * cos(sa * 5 + t * 2.48 + ph);
    v = sin((sr - petal) * 12.63);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.16, lr * 1.32 + time * -0.13); }
	p = fract(p * 1.07) - 0.5;
	p *= 2.31;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.06, 1.53, 0.88) + vec3(0.29, 0.21, 0.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
