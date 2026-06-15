uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.95; vec2 jc = vec2(0.12 + 0.3 * sin(t * 1.18 + ph), -0.50 + 0.3 * cos(t * 1.18 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 39; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(39) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.09 + vec2(t * 2.80, -t * 2.80) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.50;
	p = rot2(time * -0.68) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.11);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.61 + time * 0.27, vec3(0.52, 0.52, 0.52), vec3(0.50, 0.42, 0.47), vec3(1.17, 1.06, 0.88), vec3(0.41, 0.78, 0.22));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
