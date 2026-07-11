uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.33; vec2 jc = vec2(0.10 + 0.3 * sin(t * 0.30 + ph), 0.61 + 0.3 * cos(t * 0.30 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 16; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(16) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.34;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.76, lr * 2.84 + time * -0.13); }
	p *= 1.87;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.86 + time * 0.03, vec3(0.44, 0.43, 0.47), vec3(0.42, 0.41, 0.46), vec3(1.04, 1.26, 0.84), vec3(0.71, 0.60, 0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
