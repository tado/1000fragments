uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.68;
    float pk = 6.2831853 / 5.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 23.77 - t * 4.49 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.28 + vec2(t * 1.13, -t * 1.74) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.06;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.45 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.05);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.78 + time * 0.70);
	col = mod(col * 2.11, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
