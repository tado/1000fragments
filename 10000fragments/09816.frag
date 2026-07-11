uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.74; vec2 jc = vec2(-0.21 + 0.3 * sin(t * 1.29 + ph), 0.79 + 0.3 * cos(t * 1.29 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 38; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(38) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * 2.81 + time * 0.35) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.32 + time * 0.04, vec3(0.54, 0.54, 0.44), vec3(0.50, 0.41, 0.34), vec3(1.40, 0.89, 0.74), vec3(0.73, 0.56, 0.27));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
