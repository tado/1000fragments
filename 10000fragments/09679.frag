uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.74; vec2 jc = vec2(-0.08 + 0.3 * sin(t * 0.71 + ph), 0.11 + 0.3 * cos(t * 0.71 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 16; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(16) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.77;
	p = rot2(2.50) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.25; p = rot2(2.38) * p; }
	p = abs(p) - 0.56;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.86 + time * 0.27, vec3(0.44, 0.57, 0.44), vec3(0.35, 0.49, 0.44), vec3(1.25, 0.87, 1.33), vec3(0.83, 0.62, 0.98));
	col = fract(col * 1.65);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
