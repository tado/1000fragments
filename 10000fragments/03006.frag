uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.62 + vec2(t * 1.57, -t * 1.57) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.04;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.67, lr * 2.50 + time * -0.28); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.44 + time * 0.11, vec3(0.56, 0.52, 0.46), vec3(0.45, 0.31, 0.39), vec3(0.71, 1.34, 0.94), vec3(0.10, 0.75, 0.88));
	col = clamp((col - 0.5) * 1.25 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
