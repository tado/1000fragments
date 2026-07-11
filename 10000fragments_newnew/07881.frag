uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.24; vec2 jc = vec2(-0.03 + 0.3 * sin(t * 1.65 + ph), 0.19 + 0.3 * cos(t * 1.29 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 34.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 2.20 + vec2(t * 0.21, -t * 0.38);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.45;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 2.16) - 0.5;
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 1.19;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.66);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.30));
	vec3 col = palette(d * 1.36 + time * 0.07, vec3(0.41, 0.59, 0.43), vec3(0.31, 0.46, 0.36), vec3(1.20, 1.07, 1.39), vec3(0.90, 0.02, 0.59));
	col *= 0.82 + 0.11 * sin(gl_FragCoord.y * 2.24 + time * 6.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
