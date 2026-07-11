uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 5.0 + qr * 4.75 * sin(t * 0.46) + t * 2.32 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.20 + t * 1.58 + ph) + sin(p.y * 7.83 - t * 1.58 + ph)
        + sin((p.x + p.y) * 6.46 + t * 1.58 + ph) + sin(length(p) * 6.72 - t * 1.58 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.70;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * -3.61 + time * 0.73) * q1;
	q2 = abs(q2) - 0.71;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.25);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.11, 0.10, 0.25), vec3(0.73, 0.71, 0.69), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
