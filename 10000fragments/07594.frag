uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.20; vec2 jc = vec2(0.04 + 0.3 * sin(t * 0.39 + ph), 0.40 + 0.3 * cos(t * 0.39 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 21; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(21) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.10;
	{ float fr = length(p); p *= 1.0 + -0.43 * fr * fr; }
	p = rot2(time * 0.91) * p;
	p = rot2(0.67) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.51 + time * 0.26, vec3(0.54, 0.53, 0.51), vec3(0.40, 0.35, 0.39), vec3(0.78, 0.96, 1.01), vec3(0.70, 0.84, 0.87));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
