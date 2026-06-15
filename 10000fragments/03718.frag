uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.15 + sin(p.y * 3.56 + t * 3.25) * 4.21 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.38 + vec2(t * 0.47, -t * 0.47) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.21;
	p *= 2.43;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.52);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.76 + time * 0.08, vec3(0.58, 0.44, 0.57), vec3(0.41, 0.45, 0.39), vec3(1.29, 0.93, 1.23), vec3(0.46, 0.31, 0.28));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
