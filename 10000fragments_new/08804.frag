uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.45; vec2 jc = vec2(-0.72 + 0.3 * sin(t * 1.17 + ph), -0.37 + 0.3 * cos(t * 1.75 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 18; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 18.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = (floor(p * 26.5) + 0.5) / 26.5;
	p = rot2(time * 0.48) * p;
	p = rot2(length(p) * 3.51 + time * 1.47) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.65 + time * 0.03, vec3(0.55, 0.46, 0.42), vec3(0.36, 0.40, 0.32), vec3(1.06, 0.82, 0.94), vec3(0.83, 0.21, 0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
