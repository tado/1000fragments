uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.91; vec2 jc = vec2(-0.00 + 0.3 * sin(t * 0.86 + ph), 0.29 + 0.3 * cos(t * 0.86 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 29; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(29) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.34, lr * 1.15 + time * 0.12); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.26 + time * 0.26, vec3(0.55, 0.51, 0.46), vec3(0.46, 0.37, 0.48), vec3(1.05, 0.88, 0.92), vec3(0.23, 0.18, 0.88));
	col = clamp((col - 0.5) * 1.65 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
