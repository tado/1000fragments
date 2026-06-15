uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.69; vec2 jc = vec2(0.23 + 0.3 * sin(t * 1.44 + ph), 0.10 + 0.3 * cos(t * 1.44 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 20; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(20) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 22.11 - t * 8.98 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.08;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.00);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.71 + time * 0.07, vec3(0.60, 0.48, 0.45), vec3(0.43, 0.43, 0.44), vec3(0.73, 1.25, 0.96), vec3(0.03, 0.66, 0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
