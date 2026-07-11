uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.69 + t * 1.49 + ph) + sin(p.y * 12.40 - t * 2.07 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 10.0 + qr * 5.06 * sin(t * 0.91) + t * 4.50 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.76;
	vec2 q1 = p; vec2 q2 = p;
	q2 *= 1.72;
	q2 = abs(q2) - 0.29;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.02);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.75 + time * 0.91);
	col = fract(col * 1.82);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
