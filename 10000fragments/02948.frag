uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.20; vec2 jc = vec2(-0.31 + 0.3 * sin(t * 1.05 + ph), 0.50 + 0.3 * cos(t * 1.05 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 29; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(29) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.04;
	{ float fr = length(p); p *= 1.0 + 0.43 * fr * fr; }
	p = fract(p * 1.92) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.44, lr * 2.12 + time * -0.73); }
	p = abs(p) - 0.56;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.13 + time * 0.23, vec3(0.57, 0.57, 0.50), vec3(0.33, 0.45, 0.31), vec3(1.01, 1.09, 0.79), vec3(0.82, 0.19, 0.02));
	col = mod(col * 2.34, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
