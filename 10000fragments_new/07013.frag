uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.33 + vec2(t * 0.31, -t * 2.14) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.05; vec2 jc = vec2(-0.07 + 0.3 * sin(t * 0.46 + ph), 0.02 + 0.3 * cos(t * 1.10 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 28; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 28.0 * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 9.60 - t * 7.80 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.02;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = abs(q1) - 0.25;
	q3 = abs(q3) - 0.32;
	q3 = rot2(q3.y * -1.12 + time * 0.55) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.91);
	float d3 = fieldC(q3, time, 0.45);
	d2 = d2 * d3;
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.72 + time * 0.17, vec3(0.44, 0.54, 0.58), vec3(0.46, 0.48, 0.41), vec3(0.99, 1.15, 0.98), vec3(0.19, 0.78, 0.04));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
