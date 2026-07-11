uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.48; vec2 jc = vec2(-0.80 + 0.3 * sin(t * 1.40 + ph), 0.53 + 0.3 * cos(t * 1.40 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 39; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(39) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.97 + t * 5.70 + ph) + sin(p.y * 12.65 - t * 1.27 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * 1.43 + time * 0.96) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.01);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.36 + time * 0.30, vec3(0.53, 0.50, 0.59), vec3(0.35, 0.49, 0.37), vec3(1.17, 0.83, 0.94), vec3(0.16, 0.43, 0.26));
	col = fract(col * 1.82);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
