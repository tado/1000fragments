uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.11; vec2 jc = vec2(-0.30 + 0.3 * sin(t * 0.80 + ph), 0.52 + 0.3 * cos(t * 0.66 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 22; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 22.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.72 + sr * 19.13 - t * 3.61 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q1.x += 0.23 / wf * sin(wf * 2.79 * q1.y + time * 1.67); q1.y += 0.30 / wf * cos(wf * 3.36 * q1.x + time * 1.11); }
	q1 = rot2(length(q1) * 1.54 + time * 0.55) * q1;
	q2 *= 1.64;
	q2.x += sin(q2.y * 3.59 + time * 2.51) * 0.30;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.23);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.36, 0.01, 0.34), vec3(0.78, 0.95, 0.98), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
