uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.14) - 0.5;
    float rad = 0.31 + 0.12 * sin(t * 2.12 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 31.67 - t * 3.20 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.76;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.29);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.70 + time * 0.28, vec3(0.47, 0.59, 0.47), vec3(0.39, 0.37, 0.31), vec3(0.95, 0.88, 0.78), vec3(0.28, 0.13, 0.10));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
