uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.35, 0.0)) * 37.23 - t * 3.28 + ph);
    float mb = sin(length(p + vec2(0.35, 0.0)) * 39.00 - t * 4.80 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.62; vec2 jc = vec2(-0.64 + 0.3 * sin(t * 1.64 + ph), 0.03 + 0.3 * cos(t * 0.95 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 25; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 25.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.64;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * 1.09 + time * 1.18) * q1;
	for(int fo = 0; fo < 4; fo++){ q1 = abs(q1) - 0.16; q1 = rot2(2.22) * q1; }
	{ q2 = vec2(atan(q2.y, q2.x) * 1.03, length(q2) * 3.25 - time * 0.44); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.59);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.08, 0.06, 0.26), vec3(0.72, 0.99, 0.61), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
