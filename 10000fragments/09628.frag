uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 29.80 - t * 7.63 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.85; vec2 jc = vec2(-0.23 + 0.3 * sin(t * 0.40 + ph), 0.46 + 0.3 * cos(t * 0.40 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 27; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(27) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * 1.04 + time * 0.94) * p;
	p = abs(p) - 0.21;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.61);
	float d = d1 + d2;
	vec3 col = palette(d * 0.57 + time * 0.29, vec3(0.56, 0.57, 0.58), vec3(0.36, 0.38, 0.49), vec3(1.20, 0.79, 1.30), vec3(0.58, 0.99, 0.91));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
