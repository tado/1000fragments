uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.08; vec2 jc = vec2(0.28 + 0.3 * sin(t * 1.36 + ph), -0.22 + 0.3 * cos(t * 1.62 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 25; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 25.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.24; vec2 jc = vec2(-0.07 + 0.3 * sin(t * 1.79 + ph), 0.61 + 0.3 * cos(t * 1.66 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 29; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 29.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.88;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.28, lr * 2.91 + time * 0.87); }
	p += vec2(0.69, 0.42) * sin(length(p) * 5.60 - time * 2.28) * 0.33;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.16);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.09 + time * 0.00, vec3(0.43, 0.56, 0.56), vec3(0.31, 0.41, 0.31), vec3(0.87, 0.92, 1.09), vec3(0.74, 0.87, 0.49));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
