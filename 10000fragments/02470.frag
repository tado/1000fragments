uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.30 + vec2(t * 0.51, -t * 0.51) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.91;
	{ float fr = length(p); p *= 1.0 + -0.41 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.84 + time * 0.00, vec3(0.50, 0.42, 0.47), vec3(0.40, 0.37, 0.39), vec3(1.02, 1.22, 1.28), vec3(0.52, 0.39, 0.47));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
