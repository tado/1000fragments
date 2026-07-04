uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.59; vec2 jc = vec2(-0.32 + 0.3 * sin(t * 0.76 + ph), -0.14 + 0.3 * cos(t * 0.62 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 30; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 30.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 2.46, length(p) * 3.38 - time * 0.57); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.91, lr * 2.41 + time * -0.54); }
	p = (floor(p * 28.4) + 0.5) / 28.4;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.49, 0.25, 0.20), vec3(0.82, 0.77, 0.62), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
