uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.79 + vec2(t * 0.92, -t * 0.92) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.06, lr * 2.48 + time * -0.67); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.59 + time * 0.24, vec3(0.48, 0.43, 0.46), vec3(0.46, 0.33, 0.43), vec3(1.14, 1.33, 0.75), vec3(0.12, 0.05, 0.22));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
