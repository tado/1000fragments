uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.96 * sin(mf + 3.0) + ph), cos(t * 1.69 * cos(mf + 3.0) + ph));
        ms += 0.062 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.09) - 0.5;
    float rad = 0.41 + 0.12 * sin(t * 1.94 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 35.05 - t * 1.92 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.85;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(q1.y * 1.83 + time * 0.28) * q1;
	q1.y += sin(q1.x * 6.80 + time * 1.70) * 0.27;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.98);
	float d3 = fieldC(q3, time, 0.20);
	d2 = max(d2, d3);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.03, 0.19, 0.19), vec3(0.66, 1.00, 0.58), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
