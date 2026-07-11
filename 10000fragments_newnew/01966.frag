uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.25, 0.0)) * 27.40 - t * 3.03 + ph);
    float mb = sin(length(p + vec2(0.25, 0.0)) * 35.64 - t * 3.42 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.65 + t * 3.63 + ph) + sin(p.y * 15.76 - t * 1.30 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.58;
    float pk = 6.2831853 / 8.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 17.88 - t * 5.93 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = sin(q1 * 2.83 + time * 1.91) * 1.00;
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 0.51;
	q2 += vec2(-0.19, 0.19) * sin(length(q2) * 3.27 - time * 1.75) * 0.33;
	q3 = fract(q3 * 2.74) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.83);
	float d3 = fieldC(q3, time, 0.01);
	d2 = abs(d2 - d3);
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.07 + time * 0.77);
	col = clamp((col - 0.5) * 1.39 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
