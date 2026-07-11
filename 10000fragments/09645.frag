uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.69; vec2 jc = vec2(-0.42 + 0.3 * sin(t * 0.51 + ph), -0.10 + 0.3 * cos(t * 0.51 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 29; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(29) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.99;
	p = fract(p * 2.52) - 0.5;
	p += vec2(0.95, -0.69) * sin(length(p) * 4.89 - time * 1.96) * 0.13;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 1.88 * p.y + time * 1.66); p.y += 0.34 / wf * cos(wf * 3.77 * p.x + time * 1.12); }
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.71 + time * 0.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
