uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.23; vec2 jc = vec2(-0.70 + 0.3 * sin(t * 0.29 + ph), -0.49 + 0.3 * cos(t * 0.29 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 37; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(37) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.36, lr * 1.86 + time * -0.14); }
	{ p = vec2(atan(p.y, p.x) * 2.79, length(p) * 3.23 - time * 0.50); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.55 + time * 0.17, vec3(0.41, 0.54, 0.50), vec3(0.44, 0.41, 0.49), vec3(1.33, 0.76, 1.30), vec3(0.26, 0.81, 0.42));
	col = mod(col * 2.93, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
