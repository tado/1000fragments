uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.44 + vec2(t * 1.79, -t * 2.99) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.90; vec2 jc = vec2(-0.08 + 0.3 * sin(t * 0.47 + ph), 0.67 + 0.3 * cos(t * 0.60 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 38; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 38.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.16;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(time * -0.72) * q2;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.16, length(q2) * 5.07 - time * 0.63); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.60);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.17 + time * 0.30, vec3(0.46, 0.52, 0.59), vec3(0.44, 0.43, 0.42), vec3(0.84, 1.39, 1.06), vec3(0.58, 0.58, 0.49));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
