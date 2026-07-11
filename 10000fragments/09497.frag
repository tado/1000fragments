uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 30.88 - t * 5.27 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.92; vec2 jc = vec2(-0.70 + 0.3 * sin(t * 1.05 + ph), 0.02 + 0.3 * cos(t * 1.05 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 16; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(16) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.08;
	p = rot2(length(p) * 2.44 + time * 0.33) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.77);
	float d = d1 + d2;
	vec3 col = palette(d * 0.54 + time * 0.27, vec3(0.51, 0.59, 0.58), vec3(0.39, 0.31, 0.47), vec3(1.26, 1.19, 0.82), vec3(0.79, 0.42, 0.93));
	col = clamp((col - 0.5) * 1.75 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
