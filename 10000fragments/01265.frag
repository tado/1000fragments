uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.85 + t * 4.74 + ph) + sin(p.y * 3.78 - t * 4.74 + ph)
        + sin((p.x + p.y) * 3.50 + t * 4.74 + ph) + sin(length(p) * 13.64 - t * 4.74 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.16 + vec2(t * 0.41, -t * 0.41) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.44;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.36);
	float d = d1 + d2;
	vec3 col = palette(d * 0.71 + time * 0.26, vec3(0.44, 0.43, 0.51), vec3(0.41, 0.38, 0.35), vec3(1.24, 1.21, 0.80), vec3(0.22, 0.55, 0.28));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
