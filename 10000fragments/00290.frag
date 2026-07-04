uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.40 + sin(p.y * 1.78 + t * 0.76) * 4.51 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.54;
    float pk = 6.2831853 / 5.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 19.38 - t * 4.83 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.59;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 2.97) - 0.5;
	q2 = (floor(q2 * 12.9) + 0.5) / 12.9;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.01);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.35, 0.34, 0.63) * (0.16 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= 0.85 + 0.14 * sin(gl_FragCoord.y * 2.24 + time * 13.86);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
