uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.51; vec2 jc = vec2(0.11 + 0.3 * sin(t * 0.82 + ph), 0.26 + 0.3 * cos(t * 0.82 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 30; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(30) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.01, length(p) * 2.81 - time * 0.37); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 3.56 * p.y + time * 1.31); p.y += 0.27 / wf * cos(wf * 2.33 * p.x + time * 1.21); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.69 + time * 0.25, vec3(0.47, 0.47, 0.46), vec3(0.37, 0.40, 0.40), vec3(1.12, 1.04, 1.16), vec3(0.29, 0.62, 0.08));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
