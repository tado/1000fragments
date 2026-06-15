uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.11; vec2 jc = vec2(0.04 + 0.3 * sin(t * 1.41 + ph), 0.58 + 0.3 * cos(t * 1.41 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 27; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(27) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.34;
	p = rot2(time * -1.22) * p;
	p = rot2(p.y * -3.76 + time * 0.18) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.17 + time * 0.08, vec3(0.54, 0.43, 0.52), vec3(0.45, 0.39, 0.42), vec3(1.12, 0.96, 0.89), vec3(0.88, 0.12, 0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
