uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.92; vec2 jc = vec2(0.05 + 0.3 * sin(t * 0.98 + ph), 0.77 + 0.3 * cos(t * 0.98 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 37; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(37) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.53;
	p = rot2(0.33) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.70 + time * 0.19, vec3(0.48, 0.51, 0.43), vec3(0.42, 0.46, 0.36), vec3(1.07, 1.30, 0.92), vec3(0.81, 0.84, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
