uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 7.69);
    float gsh = hash21(vec2(grow, floor(t * 7.62))) - 0.5;
    float gx = p.x + gsh * 1.04;
    v = sin(gx * 7.32 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.44));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.15; vec2 jc = vec2(0.15 + 0.3 * sin(t * 0.80 + ph), 0.43 + 0.3 * cos(t * 0.61 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 30; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 30.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.35 / wf * sin(wf * 3.30 * q1.y + time * 2.01); q1.y += 0.41 / wf * cos(wf * 3.05 * q1.x + time * 1.31); }
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.11, lr * 1.00 + time * -0.26); }
	q2 = (floor(q2 * 7.6) + 0.5) / 7.6;
	q2 = rot2(time * -0.31) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.25);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.62 + time * 0.26, vec3(0.57, 0.59, 0.56), vec3(0.48, 0.45, 0.41), vec3(1.02, 1.19, 0.89), vec3(0.30, 0.28, 0.58));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
