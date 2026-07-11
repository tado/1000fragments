uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.19 + sr * 11.58 - t * 4.50 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.36 + sin(p.y * 3.15 + t * 5.75) * 2.70 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q1.x += 0.31 / wf * sin(wf * 3.39 * q1.y + time * 1.26); q1.y += 0.48 / wf * cos(wf * 2.33 * q1.x + time * 1.43); }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.49 / wf * sin(wf * 3.91 * q2.y + time * 1.85); q2.y += 0.49 / wf * cos(wf * 1.65 * q2.x + time * 0.65); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.39);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.53 + time * 0.31, vec3(0.44, 0.44, 0.42), vec3(0.38, 0.49, 0.46), vec3(0.83, 0.82, 1.26), vec3(0.14, 0.80, 0.66));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
