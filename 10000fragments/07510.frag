uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.70 + t * 4.76 + ph) + sin(p.y * 5.96 - t * 3.89 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.13; vec2 jc = vec2(-0.36 + 0.3 * sin(t * 0.50 + ph), 0.50 + 0.3 * cos(t * 0.50 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 27; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(27) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.88;
	p = rot2(0.56) * p;
	p += vec2(0.99, 0.81) * sin(length(p) * 5.89 - time * 1.69) * 0.36;
	{ float fr = length(p); p *= 1.0 + -0.49 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.40);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.57 + time * 0.00, vec3(0.47, 0.52, 0.56), vec3(0.40, 0.40, 0.34), vec3(0.86, 0.84, 0.93), vec3(0.78, 0.05, 0.45));
	col = fract(col * 1.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
