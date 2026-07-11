uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 34.84 - t * 4.96 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 27.03 - t * 8.54 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q2 = (floor(q2 * 20.9) + 0.5) / 20.9;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.07);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.48));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.31 + time * 0.28);
	col *= 0.87 + 0.18 * sin(gl_FragCoord.y * 2.82 + time * 16.33);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
