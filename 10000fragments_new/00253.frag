uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 19.79 + t * 1.49 + ph) * 0.7;
    float wb = sin(p.y * 5.63 - t * 1.74 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.46;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.52) - 0.5;
    float rad = 0.36 + 0.12 * sin(t * 0.93 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.63);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.83 + time * 0.03, vec3(0.59, 0.57, 0.43), vec3(0.41, 0.42, 0.42), vec3(1.36, 1.39, 1.18), vec3(0.97, 0.63, 0.62));
	col = clamp((col - 0.5) * 1.49 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
