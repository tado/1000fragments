uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.60 + jf * 4.0), cos(t * 0.29 * jf)) * 0.96;
        xs += sin(length(p - im) * 72.24 - t * 6.47 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.05; vec2 jc = vec2(-0.73 + 0.3 * sin(t * 0.95 + ph), 0.29 + 0.3 * cos(t * 0.95 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 22; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(22) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.23;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 2.35 * p.y + time * 1.04); p.y += 0.43 / wf * cos(wf * 2.66 * p.x + time * 1.65); }
	p += vec2(0.63, -0.29) * sin(length(p) * 4.59 - time * 0.72) * 0.19;
	p *= 2.09;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.02);
	float d = d1 * d2;
	vec3 col = palette(d * 1.77 + time * 0.11, vec3(0.48, 0.45, 0.43), vec3(0.37, 0.44, 0.37), vec3(1.05, 1.05, 0.84), vec3(0.94, 0.02, 0.71));
	col = mod(col * 2.09, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
