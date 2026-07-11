uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 25.56 - t * 2.10 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.48; vec2 jc = vec2(0.12 + 0.3 * sin(t * 0.72 + ph), 0.15 + 0.3 * cos(t * 0.72 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 21; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(21) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.10;
	{ float fr = length(p); p *= 1.0 + 0.69 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.17);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.80 + time * 0.27, vec3(0.49, 0.49, 0.47), vec3(0.35, 0.35, 0.33), vec3(0.72, 0.81, 0.90), vec3(0.50, 0.75, 0.44));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
