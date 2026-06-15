uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.41; vec2 jc = vec2(-0.64 + 0.3 * sin(t * 1.22 + ph), -0.59 + 0.3 * cos(t * 1.22 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 39; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(39) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.12 + sin(p.y * 1.70 + t * 5.89) * 2.98 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 0.44) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.59; p = rot2(1.40) * p; }
	p = rot2(1.12) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.57);
	float d = d1 * d2;
	vec3 col = palette(d * 1.52 + time * 0.07, vec3(0.42, 0.58, 0.55), vec3(0.34, 0.42, 0.47), vec3(1.02, 0.93, 0.83), vec3(0.12, 0.60, 0.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
