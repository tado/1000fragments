uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.56; vec2 jc = vec2(0.11 + 0.3 * sin(t * 0.52 + ph), -0.03 + 0.3 * cos(t * 0.52 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 36; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(36) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.53; vec2 jc = vec2(0.30 + 0.3 * sin(t * 0.94 + ph), 0.38 + 0.3 * cos(t * 0.94 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 40; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(40) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p) - 0.74;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.36; p = rot2(1.40) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.69);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.81 + time * 0.14, vec3(0.47, 0.46, 0.52), vec3(0.34, 0.49, 0.43), vec3(1.02, 1.32, 0.79), vec3(0.61, 0.71, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
