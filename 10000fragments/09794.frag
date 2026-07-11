uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.21; vec2 jc = vec2(-0.71 + 0.3 * sin(t * 1.20 + ph), 0.12 + 0.3 * cos(t * 1.20 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 21; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(21) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.34;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.46; p = rot2(1.79) * p; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 3.81 * p.y + time * 0.85); p.y += 0.32 / wf * cos(wf * 2.75 * p.x + time * 1.48); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.27 + time * 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
