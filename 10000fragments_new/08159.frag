uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.10;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.46; kp = rot2(0.83) * kp; kp *= 1.21; }
    v = sin(kp.y * 3.04 - t * 3.96 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 8.94);
    float gsh = hash21(vec2(grow, floor(t * 8.64))) - 0.5;
    float gx = p.x + gsh * 0.97;
    v = sin(gx * 12.58 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.81));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 2.29, lr * 1.17 + time * -0.31); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.49);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.49));
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.47, 1.38, 1.44) + vec3(0.07, 0.10, 0.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
