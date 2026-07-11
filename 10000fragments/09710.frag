uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.11; vec2 jc = vec2(-0.58 + 0.3 * sin(t * 0.39 + ph), -0.63 + 0.3 * cos(t * 0.39 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 40; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(40) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.98 + t * 3.60 + ph) + sin(p.y * 11.40 - t * 3.60 + ph)
        + sin((p.x + p.y) * 5.02 + t * 3.60 + ph) + sin(length(p) * 3.57 - t * 3.60 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * 2.50 + time * 0.74) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.31);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.20 + time * 0.24, vec3(0.42, 0.56, 0.54), vec3(0.50, 0.32, 0.38), vec3(1.19, 0.98, 0.89), vec3(0.08, 0.39, 0.79));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
