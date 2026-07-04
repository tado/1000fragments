uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.69;
    v = 0.5 * (sin(2.0 * cp.x + t * 1.90) * sin(4.0 * cp.y + ph)
             + sin(4.0 * cp.x - t * 1.43) * sin(2.0 * cp.y + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.16 + t * 1.61 + ph) + sin(p.y * 15.45 - t * 4.55 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.14;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.42);
	float d = min(d1, d2);
	vec3 col = vec3(0.77, 0.62, 0.99) * (0.08 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
