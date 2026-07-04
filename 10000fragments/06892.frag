uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.23;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.47; kp = rot2(1.69) * kp; kp *= 1.40; }
    v = sin(kp.x * 3.73 - t * 2.50 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 4.87 - t * 0.99;
    v = sin(floor(lv * 4.8) / 4.8 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.08;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.86);
	float d = 0.5 * (d1 + d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.85 + time * 0.31);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.57 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
