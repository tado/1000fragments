uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.60; vec2 jc = vec2(0.40 + 0.3 * sin(t * 1.19 + ph), 0.67 + 0.3 * cos(t * 1.19 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 31; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(31) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.54;
	p = rot2(time * -1.21) * p;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.20 + time * 0.14, vec3(0.45, 0.59, 0.48), vec3(0.44, 0.47, 0.31), vec3(0.89, 0.97, 0.94), vec3(0.91, 0.81, 0.10));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
