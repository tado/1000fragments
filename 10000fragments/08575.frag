uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.06; vec2 jc = vec2(-0.21 + 0.3 * sin(t * 1.22 + ph), -0.47 + 0.3 * cos(t * 1.22 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 35; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(35) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.39;
	{ p = vec2(atan(p.y, p.x) * 1.25, length(p) * 4.40 - time * 0.22); }
	p = rot2(0.97) * p;
	p = rot2(time * -1.03) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.08, lr * 1.09 + time * -0.78); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.70 + time * 0.07, vec3(0.49, 0.45, 0.42), vec3(0.45, 0.33, 0.42), vec3(0.80, 0.74, 1.04), vec3(0.72, 0.63, 0.84));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
