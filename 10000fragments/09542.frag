uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.03; vec2 jc = vec2(-0.35 + 0.3 * sin(t * 1.34 + ph), 0.48 + 0.3 * cos(t * 1.34 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 25; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(25) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.06;
	p = rot2(2.49) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.76 + time * 0.21, vec3(0.49, 0.53, 0.46), vec3(0.38, 0.33, 0.42), vec3(1.23, 1.30, 0.83), vec3(0.19, 0.65, 0.40));
	col = mod(col * 2.18, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
