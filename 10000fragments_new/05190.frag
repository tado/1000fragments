uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.97; vec2 jc = vec2(-0.80 + 0.3 * sin(t * 1.12 + ph), 0.24 + 0.3 * cos(t * 1.43 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 34.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.31;
	p *= 3.14;
	p = rot2(length(p) * -2.51 + time * 0.87) * p;
	p = abs(p);
	p = (floor(p * 22.2) + 0.5) / 22.2;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.77 + time * 0.04, vec3(0.58, 0.60, 0.49), vec3(0.48, 0.48, 0.47), vec3(0.86, 0.78, 0.96), vec3(0.62, 0.16, 0.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
