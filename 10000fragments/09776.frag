uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.87; vec2 jc = vec2(0.08 + 0.3 * sin(t * 0.69 + ph), -0.25 + 0.3 * cos(t * 0.69 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 21; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(21) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.42 + 0.30 * cos(sa * 8 + t * 0.69 + ph);
    v = sin((sr - petal) * 6.11);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.33);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.45 + time * 0.28, vec3(0.53, 0.45, 0.48), vec3(0.31, 0.45, 0.42), vec3(0.99, 1.23, 1.27), vec3(0.99, 0.64, 0.85));
	col = clamp((col - 0.5) * 1.62 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
