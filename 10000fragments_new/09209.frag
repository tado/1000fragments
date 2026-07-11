uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.86 + vec2(t * 0.60, -t * 0.89) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.43;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.66 + time * 0.11, vec3(0.49, 0.50, 0.46), vec3(0.45, 0.41, 0.39), vec3(1.34, 0.73, 1.18), vec3(0.36, 0.56, 0.50));
	col = clamp((col - 0.5) * 2.00 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
