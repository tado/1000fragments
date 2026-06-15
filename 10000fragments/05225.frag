uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 33.10 - t * 3.55 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.54; vec2 jc = vec2(-0.38 + 0.3 * sin(t * 1.32 + ph), 0.69 + 0.3 * cos(t * 1.32 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 24; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(24) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.78;
	p = rot2(length(p) * -3.54 + time * 0.82) * p;
	p += vec2(-0.10, -0.46) * sin(length(p) * 3.67 - time * 1.11) * 0.13;
	p = rot2(p.y * 1.22 + time * 0.54) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.47);
	float d = d1 + d2;
	vec3 col = palette(d * 0.75 + time * 0.25, vec3(0.46, 0.46, 0.46), vec3(0.47, 0.45, 0.40), vec3(1.32, 1.06, 0.89), vec3(0.98, 0.49, 0.03));
	col = mod(col * 2.52, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
