uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.21, 0.0)) * 15.32 - t * 3.15 + ph);
    float mb = sin(length(p + vec2(0.21, 0.0)) * 22.87 - t * 6.27 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.36; vec2 jc = vec2(-0.67 + 0.3 * sin(t * 1.18 + ph), -0.65 + 0.3 * cos(t * 0.80 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 39; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 39.0 * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.42, 0.0)) * 19.58 - t * 1.18 + ph);
    float mb = sin(length(p + vec2(0.42, 0.0)) * 37.47 - t * 4.56 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.72);
	float d3 = fieldC(q3, time, 1.05);
	d2 = max(d2, d3);
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.94 + time * 0.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
