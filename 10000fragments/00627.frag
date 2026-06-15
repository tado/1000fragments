uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.13; vec2 jc = vec2(-0.43 + 0.3 * sin(t * 0.85 + ph), -0.41 + 0.3 * cos(t * 0.85 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 33; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(33) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.65;
	p = rot2(p.y * 3.58 + time * 0.83) * p;
	p = rot2(length(p) * 2.29 + time * 0.82) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.10 + time * 0.02, vec3(0.53, 0.47, 0.49), vec3(0.43, 0.32, 0.31), vec3(0.86, 1.15, 1.10), vec3(0.32, 0.05, 0.23));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
