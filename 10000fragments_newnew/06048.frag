uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.47 + vec2(t * 0.83, -t * 0.93) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 4.66 + t * 0.54) - 0.5) * 2.0;
    v = sin((p.y * 6.39 + zx * 0.67 + t * 0.60) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.32;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.68);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.87 + time * 0.07, vec3(0.48, 0.45, 0.41), vec3(0.48, 0.49, 0.41), vec3(1.16, 1.38, 1.03), vec3(0.70, 0.75, 0.38));
	col *= 0.87 + 0.15 * sin(gl_FragCoord.y * 2.34 + time * 17.69);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
