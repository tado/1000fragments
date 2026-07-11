uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.50 + 0.26 * pow(abs(cos(ra * 5.0 + t * 1.34)), 2.71);
    v = sin((rr - pet) * 13.18 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.82; vec2 jc = vec2(-0.08 + 0.3 * sin(t * 1.26 + ph), 0.26 + 0.3 * cos(t * 1.38 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 39; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 39.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.14;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * 1.29 + time * 0.62) * q1;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.44 / wf * sin(wf * 2.09 * q2.y + time * 1.32); q2.y += 0.40 / wf * cos(wf * 1.88 * q2.x + time * 1.50); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.01);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.02 + time * 0.03, vec3(0.49, 0.47, 0.45), vec3(0.38, 0.40, 0.49), vec3(1.21, 1.32, 0.79), vec3(0.75, 0.48, 0.08));
	col = mod(col * 1.60, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
