uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.49 + vec2(t * 2.08, -t * 2.08) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.96 + sr * 4.38 - t * 2.62 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.92;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.20);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.54 + time * 0.27, vec3(0.57, 0.58, 0.55), vec3(0.41, 0.43, 0.49), vec3(0.94, 1.36, 0.72), vec3(0.67, 0.24, 0.35));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.00));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
