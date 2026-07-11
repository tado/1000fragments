uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.48 + vec2(t * 2.82, -t * 2.82) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.08;
	p += vec2(0.22, -0.23) * sin(length(p) * 5.78 - time * 1.32) * 0.15;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.07 + time * 0.16, vec3(0.51, 0.46, 0.45), vec3(0.49, 0.36, 0.49), vec3(1.39, 1.04, 1.13), vec3(0.38, 0.59, 0.20));
	col = mod(col * 1.55, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
