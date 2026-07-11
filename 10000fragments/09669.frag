uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.61; vec2 jc = vec2(0.02 + 0.3 * sin(t * 1.14 + ph), -0.31 + 0.3 * cos(t * 1.14 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 32; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(32) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.56, t * 1.18 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(0.23, 0.45) * sin(length(p) * 4.13 - time * 0.83) * 0.21;
	p = abs(p);
	p = rot2(p.y * 3.19 + time * 0.81) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.84);
	float d = d1 * d2;
	vec3 col = palette(d * 1.72 + time * 0.06, vec3(0.46, 0.57, 0.47), vec3(0.32, 0.44, 0.39), vec3(1.05, 1.19, 0.78), vec3(0.97, 0.57, 0.10));
	col = mod(col * 2.82, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
