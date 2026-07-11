uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.21; vec2 jc = vec2(-0.74 + 0.3 * sin(t * 1.48 + ph), 0.57 + 0.3 * cos(t * 0.91 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 24; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 24.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 18.88 + t * 2.17 + ph) * 0.7;
    float wb = sin(p.y * 11.89 - t * 3.27 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.29;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.75;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(-0.44, 0.22) * sin(length(q1) * 4.29 - time * 0.85) * 0.10;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.69; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.92);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.24));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.45 + time * 0.84);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
