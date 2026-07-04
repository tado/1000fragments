uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.45; vec2 jc = vec2(-0.66 + 0.3 * sin(t * 0.31 + ph), -0.72 + 0.3 * cos(t * 0.81 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 40; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 40.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 19.86 + t * 2.90 + ph) * 0.7;
    float wb = sin(p.y * 18.25 - t * 1.79 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.25;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.75;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(0.25, -0.18) * sin(length(q1) * 4.91 - time * 1.51) * 0.22;
	q2 = sin(q2 * 1.02 + time * 2.06) * 1.30;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.73);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.31, 0.08, 0.12), vec3(1.00, 0.70, 0.58), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
