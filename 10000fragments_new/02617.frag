uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.29; vec2 jc = vec2(-0.25 + 0.3 * sin(t * 1.56 + ph), -0.68 + 0.3 * cos(t * 0.55 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 35; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 35.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 23.75);
    float gsh = hash21(vec2(grow, floor(t * 9.84))) - 0.5;
    float gx = p.x + gsh * 0.36;
    v = sin(gx * 7.99 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.15));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.88 + jf * 4.0), cos(t * 0.21 * jf)) * 0.43;
        xs += sin(length(p - im) * 191.87 - t * 11.66 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q1); q1 *= 1.0 + 0.36 * fr * fr; }
	q1 *= 1.68;
	{ float lr = log(length(q3) + 0.001); float la = atan(q3.y, q3.x); q3 = vec2(la * 1.95, lr * 2.55 + time * 0.81); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.19);
	float d3 = fieldC(q3, time, 0.41);
	d2 = d2 * d3;
	float d = d1 * d2;
	vec3 col = palette(d * 1.17 + time * 0.35, vec3(0.52, 0.48, 0.57), vec3(0.36, 0.50, 0.40), vec3(1.25, 0.79, 0.79), vec3(0.28, 0.17, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
