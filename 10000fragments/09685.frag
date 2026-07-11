uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.10; vec2 jc = vec2(0.34 + 0.3 * sin(t * 0.56 + ph), 0.27 + 0.3 * cos(t * 0.56 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 33; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(33) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 3.25;
	p = rot2(1.83) * p;
	p = abs(p) - 0.68;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.54 + time * 0.01, vec3(0.56, 0.53, 0.59), vec3(0.42, 0.45, 0.45), vec3(1.30, 1.32, 1.21), vec3(0.66, 0.55, 0.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
