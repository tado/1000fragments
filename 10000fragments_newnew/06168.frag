uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.37 + t * 0.64) - 0.5) * 2.0;
    v = sin((p.y * 2.64 + zx * 0.73 + t * 2.23) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.63; vec2 jc = vec2(0.06 + 0.3 * sin(t * 1.15 + ph), 0.69 + 0.3 * cos(t * 0.48 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 20; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 20.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.72);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.48 + time * 0.30, vec3(0.50, 0.52, 0.48), vec3(0.32, 0.43, 0.36), vec3(1.10, 1.01, 1.09), vec3(0.33, 0.51, 0.93));
	col = clamp((col - 0.5) * 1.60 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
