uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.03 + t * 5.33 + ph) + sin(p.y * 3.30 - t * 5.83 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.22; vec2 jc = vec2(0.12 + 0.3 * sin(t * 0.75 + ph), 0.16 + 0.3 * cos(t * 0.75 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 26; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(26) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.22;
	p += vec2(-0.72, 0.37) * sin(length(p) * 2.69 - time * 1.23) * 0.27;
	p = rot2(length(p) * -3.62 + time * 1.06) * p;
	p = rot2(p.y * 1.94 + time * 0.39) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.30);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.70 + time * 0.27, vec3(0.41, 0.50, 0.41), vec3(0.44, 0.31, 0.44), vec3(0.91, 0.78, 0.88), vec3(0.72, 0.98, 0.09));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
