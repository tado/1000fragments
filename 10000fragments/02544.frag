uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.20 + sr * 7.62 - t * 4.33 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 6.0 + qr * 3.30 * sin(t * 1.42) + t * 2.82 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 18.52);
    float gsh = hash21(vec2(grow, floor(t * 5.43))) - 0.5;
    float gx = p.x + gsh * 0.63;
    v = sin(gx * 11.30 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.05));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.70;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.40 / wf * sin(wf * 3.62 * q1.y + time * 0.95); q1.y += 0.44 / wf * cos(wf * 3.62 * q1.x + time * 0.74); }
	q1 = rot2(time * 0.56) * q1;
	for(int fo = 0; fo < 4; fo++){ q2 = abs(q2) - 0.24; q2 = rot2(2.59) * q2; }
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 0.52));
	q3 *= 1.0 + 0.12 * sin(time * 3.68);
	q3 = mix(q3, q3.yx, 0.5 + 0.5 * sin(time * 0.66));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.07);
	float d3 = fieldC(q3, time, 0.57);
	d2 = 0.5 * (d2 + d3);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.27, 0.23, 0.50), vec3(0.65, 0.78, 0.93), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.77));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
