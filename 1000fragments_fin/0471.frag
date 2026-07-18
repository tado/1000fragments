uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.87 + t * 3.20 + ph) + sin(p.y * 3.73 - t * 3.20 + ph)
        + sin((p.x + p.y) * 11.55 + t * 3.20 + ph) + sin(length(p) * 6.27 - t * 3.20 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.87; vec2 jc = vec2(-0.26 + 0.3 * sin(t * 0.63 + ph), 0.47 + 0.3 * cos(t * 0.30 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 37; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 37.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.28 + (time * 0.73) * 1.28) * 0.06;
	p *= 1.57;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.32, lr * 1.30 + (time * 0.73) * 0.90); }
	float d1 = fieldA(q1, (time * 0.73), 0.0);
	float d2 = fieldB(q2, (time * 0.73), 0.05);
	float d = mix(d1, d2, 0.5 + 0.5 * sin((time * 0.73) * 1.57));
	vec3 col = vec3(0.704, 0.976, 0.845) * (0.07 / (abs((d)) + 0.04));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.36);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col *= vec3(0.926, 0.974, 1.037);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.44 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
