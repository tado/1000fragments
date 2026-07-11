uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.99 + sin(p.y * 4.17 + t * 2.97) * 3.94 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.68) - 0.5;
    float rad = 0.43 + 0.12 * sin(t * 1.77 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 2.15;
	{ float fr = length(q1); q1 *= 1.0 + -0.60 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.69);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.10 + time * 0.24, vec3(0.45, 0.50, 0.48), vec3(0.33, 0.32, 0.31), vec3(1.11, 0.88, 1.18), vec3(0.86, 0.95, 0.24));
	col *= 0.88 + 0.17 * sin(gl_FragCoord.y * 1.76 + time * 12.95);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
