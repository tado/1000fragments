uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.43; vec2 jc = vec2(0.26 + 0.3 * sin(t * 0.99 + ph), 0.44 + 0.3 * cos(t * 0.99 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(34) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.41;
	p = rot2(2.89) * p;
	p *= 1.56;
	p = fract(p * 2.92) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.51 + time * 0.15, vec3(0.57, 0.53, 0.43), vec3(0.44, 0.31, 0.46), vec3(1.17, 1.01, 0.90), vec3(0.66, 0.31, 0.22));
	col = mod(col * 2.89, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
