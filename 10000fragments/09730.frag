uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.81; vec2 jc = vec2(0.00 + 0.3 * sin(t * 0.69 + ph), 0.40 + 0.3 * cos(t * 0.69 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 27; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(27) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * -3.94 + time * 0.81) * p;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.94 + time * 0.12, vec3(0.60, 0.44, 0.50), vec3(0.36, 0.42, 0.38), vec3(0.85, 1.21, 0.99), vec3(0.58, 0.12, 0.39));
	col = fract(col * 1.44);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
