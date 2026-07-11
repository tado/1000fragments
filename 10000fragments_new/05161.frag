uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.86; vec2 jc = vec2(-0.44 + 0.3 * sin(t * 1.20 + ph), 0.67 + 0.3 * cos(t * 1.30 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 18; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 18.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.89 + sr * 13.49 - t * 1.83 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1) - 0.49;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.45);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.06 + time * 0.28, vec3(0.48, 0.50, 0.53), vec3(0.39, 0.41, 0.33), vec3(1.38, 1.20, 1.16), vec3(0.51, 0.13, 0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
