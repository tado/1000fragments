uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.59 + 0.27 * cos(sa * 6.0 + t * 2.44 + ph);
    v = sin((sr - petal) * 6.96);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.95; vec2 jc = vec2(0.08 + 0.3 * sin(t * 1.69 + ph), 0.23 + 0.3 * cos(t * 0.93 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 24; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 24.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.30;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * 1.68 + time * 1.23) * q1;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.54);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.79 + time * 0.19, vec3(0.52, 0.59, 0.41), vec3(0.45, 0.31, 0.47), vec3(1.14, 1.14, 0.85), vec3(0.12, 0.08, 0.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
