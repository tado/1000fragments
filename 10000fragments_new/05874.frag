uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 17.05 + t * 2.37 + ph) * 0.7;
    float wb = sin(p.y * 14.49 - t * 2.09 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.78;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 9.0 + qr * 4.15 * sin(t * 1.13) + t * 1.27 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.90;
	vec2 q1 = p; vec2 q2 = p;
	q2 *= 1.35;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.71);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.17 + time * 0.55);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
