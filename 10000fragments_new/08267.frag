uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 12.0 + qr * 3.32 * sin(t * 1.16) + t * 5.90 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.39, 0.0)) * 8.44 - t * 4.52 + ph);
    float mb = sin(length(p + vec2(0.39, 0.0)) * 34.87 - t * 2.21 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + 0.36 * fr * fr; }
	q1.x += sin(q1.y * 5.15 + time * 3.32) * 0.23;
	q2 *= 1.34;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.40 / wf * sin(wf * 3.57 * q2.y + time * 1.55); q2.y += 0.39 / wf * cos(wf * 3.97 * q2.x + time * 0.61); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.62);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.39 + time * 0.03, vec3(0.56, 0.43, 0.43), vec3(0.37, 0.44, 0.37), vec3(1.40, 0.80, 1.32), vec3(0.28, 0.86, 0.05));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.05;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
