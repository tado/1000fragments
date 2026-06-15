uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.28 + sin(p.y * 2.04 + t * 5.66) * 2.71 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.01; vec2 jc = vec2(-0.00 + 0.3 * sin(t * 1.41 + ph), 0.70 + 0.3 * cos(t * 1.41 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 32; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(32) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.82) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.04);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.54 + time * 0.05, vec3(0.42, 0.48, 0.53), vec3(0.37, 0.45, 0.46), vec3(0.84, 1.35, 0.96), vec3(0.22, 0.58, 0.32));
	col = mod(col * 2.30, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
