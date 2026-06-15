uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.64 + 0.12 * cos(sa * 8 + t * 1.98 + ph);
    v = sin((sr - petal) * 11.28);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.29; vec2 jc = vec2(-0.67 + 0.3 * sin(t * 0.86 + ph), -0.50 + 0.3 * cos(t * 0.86 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 27; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(27) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.07;
	p = abs(p) - 0.56;
	p *= 2.66;
	p += vec2(-0.10, 0.37) * sin(length(p) * 3.04 - time * 0.86) * 0.22;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.41);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.81 + time * 0.21, vec3(0.42, 0.44, 0.59), vec3(0.37, 0.35, 0.45), vec3(1.31, 1.00, 1.32), vec3(0.34, 0.79, 0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
