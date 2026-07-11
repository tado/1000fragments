uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.06; vec2 jc = vec2(0.23 + 0.3 * sin(t * 1.74 + ph), 0.78 + 0.3 * cos(t * 1.19 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 18; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 18.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.92 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.51 + t * 2.76 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(0.70, 0.79) * sin(length(q1) * 4.67 - time * 1.30) * 0.23;
	q1 *= 2.64;
	q2 = abs(q2) - 0.26;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.07);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.07 + time * 0.32, vec3(0.47, 0.46, 0.48), vec3(0.45, 0.37, 0.50), vec3(1.02, 1.10, 1.07), vec3(0.47, 0.80, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
