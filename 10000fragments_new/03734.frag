uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 3.0 + qr * 3.63 * sin(t * 0.42) + t * 5.96 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.10 + t * 1.07 + ph) + sin(p.y * 5.29 - t * 1.07 + ph)
        + sin((p.x + p.y) * 11.58 + t * 1.07 + ph) + sin(length(p) * 10.26 - t * 1.07 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.47 * sin(mf + 3.0) + ph), cos(t * 0.55 * cos(mf + 3.0) + ph));
        ms += 0.030 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.64 * fr * fr; }
	q1 = rot2(time * -0.35) * q1;
	q2 = abs(q2);
	q2 = (floor(q2 * 10.1) + 0.5) / 10.1;
	q3 = rot2(1.47) * q3;
	q3 += vec2(-0.55, 0.40) * sin(length(q3) * 2.06 - time * 2.13) * 0.13;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.82);
	float d3 = fieldC(q3, time, 0.05);
	d2 = abs(d2 - d3);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.37 + time * 0.21, vec3(0.41, 0.46, 0.56), vec3(0.34, 0.43, 0.42), vec3(0.70, 1.32, 1.29), vec3(0.64, 0.59, 0.12));
	col = fract(col * 1.42);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
