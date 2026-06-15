uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.16 + sin(p.y * 3.50 + t * 0.92) * 3.33 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.08; vec2 jc = vec2(0.34 + 0.3 * sin(t * 0.41 + ph), 0.56 + 0.3 * cos(t * 0.41 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 16; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(16) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.30) * p;
	{ p = vec2(atan(p.y, p.x) * 1.44, length(p) * 2.87 - time * 0.68); }
	p += vec2(-0.29, -0.48) * sin(length(p) * 4.73 - time * 1.81) * 0.31;
	p = rot2(2.04) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.01);
	float d = d1 + d2;
	vec3 col = palette(d * 1.28 + time * 0.18, vec3(0.50, 0.56, 0.45), vec3(0.34, 0.37, 0.48), vec3(0.88, 1.01, 0.84), vec3(0.59, 0.85, 0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
