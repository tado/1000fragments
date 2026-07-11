uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.18 + sr * 13.62 - t * 2.08 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.25 * sin(mf + 3.0) + ph), cos(t * 2.41 * cos(mf + 3.0) + ph));
        ms += 0.056 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.31 + t * 3.43 + ph) + sin(p.y * 7.16 - t * 3.43 + ph)
        + sin((p.x + p.y) * 10.38 + t * 3.43 + ph) + sin(length(p) * 13.12 - t * 3.43 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = rot2(2.86) * q2;
	q2 = rot2(length(q2) * 2.92 + time * 1.26) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.05);
	float d3 = fieldC(q3, time, 1.33);
	d2 = d2 * d3;
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.15 + time * 0.60);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
