uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.95; vec2 jc = vec2(-0.77 + 0.3 * sin(t * 1.14 + ph), 0.60 + 0.3 * cos(t * 1.14 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 33; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(33) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.10) - 0.5;
    float rad = 0.36 + 0.12 * sin(t * 1.25 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.43;
	p *= 3.46;
	p = rot2(length(p) * -1.14 + time * 0.96) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.48);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.52 + time * 0.08, vec3(0.57, 0.54, 0.41), vec3(0.43, 0.31, 0.30), vec3(1.29, 0.88, 0.92), vec3(0.85, 0.72, 0.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
