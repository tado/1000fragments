uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.57 + 0.29 * pow(abs(cos(ra * 4.0 + t * 2.57)), 2.33);
    v = sin((rr - pet) * 11.72 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.17; vec2 jc = vec2(-0.31 + 0.3 * sin(t * 1.73 + ph), -0.19 + 0.3 * cos(t * 0.54 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 17; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 17.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 2.67;
	q2 *= 1.0 + 0.26 * sin(time * 4.03);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.27);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.54 + time * 0.11, vec3(0.50, 0.46, 0.54), vec3(0.38, 0.38, 0.33), vec3(1.19, 0.75, 1.07), vec3(0.24, 0.88, 0.43));
	col = clamp((col - 0.5) * 1.77 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
