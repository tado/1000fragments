uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.02; vec2 jc = vec2(-0.59 + 0.3 * sin(t * 0.99 + ph), -0.23 + 0.3 * cos(t * 1.45 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 24; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 24.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 7.40 + ga * 3.0 - t * 2.89 + ph);
    v = arm * exp(-gr * 0.77);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 1.50));
	q2 += vec2(0.43, 0.61) * sin(length(q2) * 5.68 - time * 1.74) * 0.30;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.22);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.42));
	vec3 col = palette(d * 0.72 + time * 0.04, vec3(0.44, 0.49, 0.46), vec3(0.36, 0.40, 0.37), vec3(1.30, 1.34, 1.21), vec3(0.93, 0.10, 0.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
