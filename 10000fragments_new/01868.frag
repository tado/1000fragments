uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.29; vec2 jc = vec2(-0.38 + 0.3 * sin(t * 0.93 + ph), -0.12 + 0.3 * cos(t * 1.09 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 22; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 22.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.23;
	p = rot2(time * 0.66) * p;
	p += vec2(-0.02, -0.85) * sin(length(p) * 2.38 - time * 2.22) * 0.40;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.17 + time * 0.29, vec3(0.46, 0.53, 0.58), vec3(0.38, 0.50, 0.44), vec3(0.92, 0.94, 1.29), vec3(0.27, 0.11, 0.71));
	col = clamp((col - 0.5) * 1.74 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
