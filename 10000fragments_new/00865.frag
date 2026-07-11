uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.69; vec2 jc = vec2(0.40 + 0.3 * sin(t * 1.36 + ph), -0.24 + 0.3 * cos(t * 0.78 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 34.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.24 + t * 4.20 + ph) + sin(p.y * 5.81 - t * 4.20 + ph)
        + sin((p.x + p.y) * 2.72 + t * 4.20 + ph) + sin(length(p) * 8.62 - t * 4.20 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.92, length(q1) * 2.24 - time * 0.46); }
	q2 = rot2(0.76) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.67);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.15, 0.36, 0.19), vec3(0.71, 0.99, 0.79), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
