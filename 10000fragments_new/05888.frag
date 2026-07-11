uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.50 + 0.18 * cos(sa * 4.0 + t * 1.58 + ph);
    v = sin((sr - petal) * 19.99);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.47 * sin(mf + 3.0) + ph), cos(t * 0.74 * cos(mf + 3.0) + ph));
        ms += 0.093 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.04;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 1.10) - 0.5;
	q1 = abs(q1);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.19);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.27));
	vec3 col = vec3(0.67, 0.32, 0.20) * (0.14 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= 0.83 + 0.19 * sin(gl_FragCoord.y * 0.96 + time * 7.76);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
