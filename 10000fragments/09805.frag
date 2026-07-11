uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.23; vec2 jc = vec2(-0.29 + 0.3 * sin(t * 0.70 + ph), -0.02 + 0.3 * cos(t * 0.70 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 20; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(20) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * 1.49 + time * 0.60) * p;
	p = fract(p * 1.61) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.91 + time * 0.00, vec3(0.60, 0.41, 0.47), vec3(0.34, 0.33, 0.36), vec3(0.84, 1.15, 0.97), vec3(0.31, 0.74, 0.94));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.90));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
