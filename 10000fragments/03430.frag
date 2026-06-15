uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.20; vec2 jc = vec2(-0.42 + 0.3 * sin(t * 0.79 + ph), 0.68 + 0.3 * cos(t * 0.79 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 18; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(18) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.04;
	p *= 2.40;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.81 + time * 0.04, vec3(0.51, 0.51, 0.52), vec3(0.35, 0.48, 0.44), vec3(0.75, 1.02, 1.26), vec3(0.98, 0.10, 0.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
