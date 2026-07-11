uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.06;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.70; kp = rot2(1.07) * kp; kp *= 1.39; }
    v = sin(kp.x * 2.17 - t * 2.42 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 8.40);
    float gsh = hash21(vec2(grow, floor(t * 3.29))) - 0.5;
    float gx = p.x + gsh * 0.47;
    v = sin(gx * 12.08 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.53));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.22;
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.07, length(q1) * 3.42 - time * 0.38); }
	q2 = rot2(q2.y * 3.14 + time * 0.87) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.67);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 0.84 + time * 0.09);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.30 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
