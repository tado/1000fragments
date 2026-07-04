uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.31 + sin(p.y * 3.59 + t * 2.99) * 4.64 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.12 + vec2(t * 1.86, -t * 1.36) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.91;
	vec2 q1 = p; vec2 q2 = p;
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 1.06;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.16);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.66 + time * 0.05);
	col = mod(col * 2.97, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
