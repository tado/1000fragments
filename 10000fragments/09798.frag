uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.48; vec2 jc = vec2(-0.06 + 0.3 * sin(t * 0.98 + ph), 0.10 + 0.3 * cos(t * 0.98 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 33; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(33) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.78;
	p = rot2(2.81) * p;
	{ float fr = length(p); p *= 1.0 + 0.72 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.70 + time * 0.26, vec3(0.58, 0.44, 0.57), vec3(0.43, 0.30, 0.36), vec3(0.87, 1.33, 0.89), vec3(0.68, 0.90, 0.33));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
