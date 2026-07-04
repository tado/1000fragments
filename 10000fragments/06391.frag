uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.89; vec2 jc = vec2(-0.30 + 0.3 * sin(t * 1.29 + ph), 0.75 + 0.3 * cos(t * 1.42 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 36; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 36.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.18 + sr * 11.73 - t * 1.57 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.56;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 1.0 + 0.17 * sin(time * 2.06);
	q1 = fract(q1 * 1.84) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.59);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.26, 0.17, 0.25), vec3(0.91, 0.96, 0.52), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.74 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
