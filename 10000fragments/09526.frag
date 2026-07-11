uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.92; vec2 jc = vec2(0.34 + 0.3 * sin(t * 0.66 + ph), 0.37 + 0.3 * cos(t * 0.66 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 17; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(17) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.73;
	p = rot2(time * 0.91) * p;
	p = fract(p * 1.80) - 0.5;
	p = rot2(length(p) * -2.72 + time * 0.35) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.11, vec3(0.43, 0.41, 0.58), vec3(0.31, 0.37, 0.41), vec3(0.91, 1.15, 1.18), vec3(0.67, 0.37, 0.30));
	col = fract(col * 1.60);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
