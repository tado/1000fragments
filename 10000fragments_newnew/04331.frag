uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.40;
    float pk = 6.2831853 / 5.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 21.47 - t * 3.22 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.34 + 0.30 * pow(abs(cos(ra * 7.0 + t * 1.08)), 1.12);
    v = sin((rr - pet) * 19.78 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.20;
	vec2 q1 = p; vec2 q2 = p;
	q1.y += sin(q1.x * 3.06 + time * 2.35) * 0.36;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.86;
	q2 *= 1.0 + 0.26 * sin(time * 1.00);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.02);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.32, 1.23, 0.74) + vec3(0.16, 0.17, 0.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
