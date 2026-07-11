uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 3.93;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.61)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 12.98 - t * 3.63 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.32 + t * 2.74 + ph) + sin(p.y * 9.79 - t * 5.85 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.92;
	vec2 q1 = p; vec2 q2 = p;
	q1.x += sin(q1.y * 6.43 + time * 1.91) * 0.23;
	q1 += vec2(0.13, -0.87) * sin(length(q1) * 5.26 - time * 1.31) * 0.18;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 2.20, lr * 1.69 + time * -0.64); }
	q2 = abs(q2);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.04);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.16 + time * 0.14, vec3(0.49, 0.44, 0.51), vec3(0.33, 0.33, 0.37), vec3(1.38, 0.89, 1.11), vec3(0.32, 0.42, 0.08));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.01 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
