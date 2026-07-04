uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.69 + t * 4.16 + ph) + sin(p.y * 11.27 - t * 2.54 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 10.0 + qr * 5.15 * sin(t * 0.75) + t * 3.84 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.82;
	vec2 q1 = p; vec2 q2 = p;
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 0.90;
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 1.78));
	q2 = abs(q2) - 0.30;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.61);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.31, 0.13, 0.16), vec3(0.70, 0.99, 0.92), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.08 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
