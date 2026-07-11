uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.68;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.59; kp = rot2(2.68) * kp; kp *= 1.39; }
    v = sin(kp.x * 1.98 - t * 4.82 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.64;
    v = 0.5 * (sin(5.0 * cp.x + t * 0.53) * sin(7.0 * cp.y + ph)
             + sin(7.0 * cp.x - t * 1.01) * sin(5.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.17;
	vec2 q1 = p; vec2 q2 = p;
	q2 *= 1.0 + 0.33 * sin(time * 3.06);
	q2 = (floor(q2 * 19.1) + 0.5) / 19.1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.26);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.98, 0.46, 0.98) * (0.08 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
