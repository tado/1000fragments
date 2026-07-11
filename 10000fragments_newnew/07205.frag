uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.28 + t * 0.66) - 0.5) * 2.0;
    v = sin((p.y * 5.82 + zx * 1.78 + t * 3.00) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.22 + t * 2.79 + ph) + sin(p.y * 11.17 - t * 3.29 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.33; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.87);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.66, 0.58, 0.71) * (0.20 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
