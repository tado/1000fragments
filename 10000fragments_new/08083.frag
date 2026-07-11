uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.69 + sin(p.y * 5.81 + t * 1.11) * 4.21 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.71) - 0.5;
    float rad = 0.42 + 0.12 * sin(t * 2.54 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.93;
	vec2 q1 = p; vec2 q2 = p;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.25, length(q2) * 3.28 - time * 0.27); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.32);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.29 + time * 0.31, vec3(0.44, 0.43, 0.60), vec3(0.44, 0.48, 0.47), vec3(1.30, 1.32, 0.91), vec3(0.34, 0.69, 0.60));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.87 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
