uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.83 * sin(mf + 3.0) + ph), cos(t * 1.80 * cos(mf + 3.0) + ph));
        ms += 0.025 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.63; vec2 jc = vec2(-0.31 + 0.3 * sin(t * 1.21 + ph), -0.02 + 0.3 * cos(t * 0.96 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 27; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 27.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 0.72;
	q1 += vec2(-0.54, 0.14) * sin(length(q1) * 5.83 - (time * 0.65) * 1.41) * 0.30;
	q2.x += sin(q2.y * 5.10 + (time * 0.65) * 2.76) * 0.18;
	q2 = fract(q2 * 2.74) - 0.5;
	float d1 = fieldA(q1, (time * 0.65), 0.0);
	float d2 = fieldB(q2, (time * 0.65), 0.31);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.40, 0.30, 0.42), vec3(0.60, 0.61, 0.55), smoothstep(0.0, 1.0, cc));
	col *= 0.85 + 0.14 * sin(gl_FragCoord.y * 2.20 + (time * 0.65) * 16.88);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.41);
	col = clamp(col, 0.0, 1.0) * vec3(0.974, 1.027, 0.933) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
