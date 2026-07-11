uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.86 + vec2(t * 2.18, -t * 2.18) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.33 + sin(p.y * 3.01 + t * 2.18) * 1.26 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.67);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.47 + time * 0.03, vec3(0.49, 0.48, 0.46), vec3(0.46, 0.43, 0.32), vec3(1.02, 1.18, 1.40), vec3(0.65, 0.32, 0.41));
	col = clamp((col - 0.5) * 1.51 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
