uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.67 + vec2(t * 1.44, -t * 1.44) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.14 + sin(p.y * 1.42 + t * 1.88) * 2.87 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.92);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.00 + time * 0.25, vec3(0.43, 0.41, 0.47), vec3(0.40, 0.43, 0.42), vec3(0.85, 1.02, 0.73), vec3(0.31, 0.62, 0.52));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.79));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
