uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.57 + t * 1.96 + ph) + sin(p.y * 11.24 - t * 1.96 + ph)
        + sin((p.x + p.y) * 6.12 + t * 1.96 + ph) + sin(length(p) * 17.95 - t * 1.96 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.62;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.42; kp = rot2(0.60) * kp; kp *= 1.36; }
    v = sin(kp.y * 1.75 - t * 2.48 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.90);
	float d = d1 * d2;
	vec3 col = vec3(0.79, 0.76, 0.91) * (0.06 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.62 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
