uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.89; vec2 jc = vec2(0.11 + 0.3 * sin(t * 0.64 + ph), 0.67 + 0.3 * cos(t * 0.64 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 37; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(37) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.46 + vec2(t * 2.74, -t * 2.74) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.84;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.26);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.80 + time * 0.21, vec3(0.45, 0.49, 0.53), vec3(0.33, 0.35, 0.47), vec3(0.93, 1.03, 1.01), vec3(0.25, 0.31, 0.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
