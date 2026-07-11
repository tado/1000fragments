uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.98; vec2 jc = vec2(-0.10 + 0.3 * sin(t * 0.98 + ph), 0.19 + 0.3 * cos(t * 0.98 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 19; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(19) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.30; vec2 jc = vec2(-0.20 + 0.3 * sin(t * 0.69 + ph), 0.20 + 0.3 * cos(t * 0.69 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 24; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(24) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * 2.95 + time * 0.59) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.51);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.74 + time * 0.14, vec3(0.46, 0.58, 0.53), vec3(0.35, 0.44, 0.45), vec3(0.79, 1.16, 0.96), vec3(0.81, 0.61, 0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
