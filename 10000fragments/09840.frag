uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.59 + t * 4.95 + ph) + sin(p.y * 4.59 - t * 2.57 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.94; vec2 jc = vec2(-0.71 + 0.3 * sin(t * 1.22 + ph), -0.44 + 0.3 * cos(t * 1.22 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 17; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(17) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.27;
	p *= 2.53;
	p = rot2(time * 0.77) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.38);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.02 + time * 0.16, vec3(0.44, 0.53, 0.41), vec3(0.38, 0.43, 0.49), vec3(0.81, 0.71, 1.30), vec3(0.14, 0.60, 0.10));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
