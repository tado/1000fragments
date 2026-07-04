uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.58; vec2 jc = vec2(-0.01 + 0.3 * sin(t * 0.52 + ph), -0.31 + 0.3 * cos(t * 1.14 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 31; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 31.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(2.15) * p;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.16;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.00));
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.56 + time * 0.20, vec3(0.41, 0.45, 0.43), vec3(0.35, 0.48, 0.39), vec3(1.26, 0.92, 0.98), vec3(0.23, 0.47, 0.54));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
