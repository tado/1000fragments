uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.79 * sin(mf + 3.0) + ph), cos(t * 0.95 * cos(mf + 3.0) + ph));
        ms += 0.077 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.39 - t * 1.28;
    v = sin(floor(lv * 5.1) / 5.1 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * -2.01 + time * 0.33) * q1;
	q1 = sin(q1 * 2.08 + time * 2.31) * 1.41;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.78);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.32, 0.08, 0.26), vec3(0.96, 0.79, 0.86), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
