uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 9.76);
    float gsh = hash21(vec2(grow, floor(t * 5.99))) - 0.5;
    float gx = p.x + gsh * 0.34;
    v = sin(gx * 18.20 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.56));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.74;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.48; kp = rot2(1.42) * kp; kp *= 1.35; }
    v = sin(kp.x * 1.24 - t * 2.61 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.50;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * -2.69 + time * 0.90) * q1;
	q1 = rot2(time * 0.53) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.79);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.49, 0.78, 0.38) * (0.12 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
