uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.74; vec2 jc = vec2(-0.57 + 0.3 * sin(t * 0.80 + ph), 0.56 + 0.3 * cos(t * 0.80 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 27; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(27) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.42 + sr * 12.70 - t * 4.08 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * 3.47 + time * 0.65) * p;
	p += vec2(0.05, 0.46) * sin(length(p) * 3.68 - time * 0.51) * 0.37;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.14);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.71 + time * 0.08, vec3(0.49, 0.42, 0.47), vec3(0.40, 0.40, 0.41), vec3(1.01, 0.86, 1.29), vec3(0.20, 0.92, 0.43));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
