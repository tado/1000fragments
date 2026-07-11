uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.21; vec2 jc = vec2(-0.41 + 0.3 * sin(t * 0.47 + ph), -0.42 + 0.3 * cos(t * 0.47 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 16; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(16) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 23.75 - t * 4.74 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.44;
	p *= 1.34;
	p = rot2(length(p) * -1.43 + time * 0.25) * p;
	{ float fr = length(p); p *= 1.0 + -0.62 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.21);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.05 + time * 0.29, vec3(0.56, 0.41, 0.56), vec3(0.33, 0.36, 0.33), vec3(0.91, 1.02, 1.33), vec3(0.21, 0.58, 0.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
