uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.23; vec2 jc = vec2(0.31 + 0.3 * sin(t * 1.46 + ph), 0.77 + 0.3 * cos(t * 1.46 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 33; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(33) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.10, lr * 2.75 + time * -0.40); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.51 + time * 0.08);
	col = mod(col * 2.61, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
