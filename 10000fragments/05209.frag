uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.15; vec2 jc = vec2(-0.53 + 0.3 * sin(t * 1.26 + ph), 0.60 + 0.3 * cos(t * 1.26 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 24; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(24) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.26;
	p += vec2(0.13, -0.20) * sin(length(p) * 3.11 - time * 1.53) * 0.13;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.63, lr * 1.73 + time * -0.36); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.29, 0.06, 0.59), vec3(0.63, 0.68, 0.56), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
