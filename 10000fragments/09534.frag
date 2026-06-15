uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.86; vec2 jc = vec2(-0.54 + 0.3 * sin(t * 1.13 + ph), 0.31 + 0.3 * cos(t * 1.13 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 37; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(37) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 2.24) - 0.5;
	p = rot2(p.y * -1.04 + time * 0.56) * p;
	{ float fr = length(p); p *= 1.0 + -0.68 * fr * fr; }
	p = rot2(0.59) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.57 + time * 0.21, vec3(0.52, 0.52, 0.52), vec3(0.43, 0.36, 0.47), vec3(0.98, 0.71, 0.80), vec3(0.05, 0.80, 0.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
