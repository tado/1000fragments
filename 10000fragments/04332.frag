uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.36, 0.0)) * 10.22 - t * 5.49 + ph);
    float mb = sin(length(p + vec2(0.36, 0.0)) * 34.10 - t * 5.49 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.12 + vec2(t * 2.58, -t * 2.58) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.78;
	p *= 3.38;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.89);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.44 + time * 0.16, vec3(0.48, 0.40, 0.41), vec3(0.37, 0.46, 0.35), vec3(0.75, 0.98, 0.81), vec3(0.39, 0.92, 0.28));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
