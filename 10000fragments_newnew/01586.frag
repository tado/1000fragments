uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.60 - t * 1.34;
    v = sin(floor(lv * 3.0) / 3.0 * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.11;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.61; kp = rot2(0.41) * kp; kp *= 1.25; }
    v = sin(kp.x * 1.41 - t * 1.04 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 1.0 + 0.34 * sin(time * 3.36);
	q1 = sin(q1 * 1.01 + time * 1.59) * 1.24;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.15);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.88 + time * 0.82);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
