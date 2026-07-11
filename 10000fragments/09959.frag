uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.37; vec2 jc = vec2(-0.12 + 0.3 * sin(t * 0.69 + ph), 0.45 + 0.3 * cos(t * 0.69 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 28; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(28) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.65;
	p *= 2.27;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.40; p = rot2(1.83) * p; }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 3.64 * p.y + time * 1.49); p.y += 0.29 / wf * cos(wf * 3.24 * p.x + time * 1.67); }
	p = rot2(length(p) * 3.79 + time * 1.19) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.75 + time * 0.21, vec3(0.57, 0.57, 0.41), vec3(0.39, 0.36, 0.49), vec3(0.96, 0.74, 1.03), vec3(0.22, 0.18, 0.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
