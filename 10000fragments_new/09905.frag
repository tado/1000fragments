uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.37) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 3.26 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.14 + sin(p.y * 5.34 + t * 5.82) * 2.16 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.51;
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 24.0) + 0.5) / 24.0;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.61);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.46 + time * 0.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
