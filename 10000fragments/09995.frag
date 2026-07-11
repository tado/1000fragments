uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.55; vec2 jc = vec2(-0.40 + 0.3 * sin(t * 1.18 + ph), -0.75 + 0.3 * cos(t * 1.18 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(34) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.85;
	p = rot2(length(p) * 3.44 + time * 0.40) * p;
	p = rot2(1.85) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.03 + time * 0.13, vec3(0.52, 0.49, 0.57), vec3(0.41, 0.37, 0.36), vec3(0.82, 0.88, 0.77), vec3(0.18, 0.85, 0.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
