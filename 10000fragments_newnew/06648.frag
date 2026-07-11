uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.14; vec2 jc = vec2(-0.71 + 0.3 * sin(t * 0.91 + ph), -0.27 + 0.3 * cos(t * 0.37 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 28; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 28.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.89; vec2 jc = vec2(-0.42 + 0.3 * sin(t * 1.70 + ph), -0.28 + 0.3 * cos(t * 0.32 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 16; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 16.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.91;
	p *= 1.64;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.62; }
	p += vec2(0.91, 0.02) * sin(length(p) * 5.79 - time * 1.90) * 0.11;
	p = sin(p * 1.74 + time * 0.81) * 1.20;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.89);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.28 + time * 0.00, vec3(0.58, 0.43, 0.57), vec3(0.39, 0.49, 0.47), vec3(1.26, 0.97, 1.21), vec3(0.30, 0.57, 0.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
