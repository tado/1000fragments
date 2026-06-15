uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.37 + vec2(t * 2.79, -t * 2.79) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.53 + vec2(t * 2.11, -t * 2.11) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.06) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.03);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.12 + time * 0.20, vec3(0.52, 0.51, 0.47), vec3(0.32, 0.49, 0.47), vec3(1.24, 0.97, 0.88), vec3(0.71, 0.20, 0.14));
	col = clamp((col - 0.5) * 1.21 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
