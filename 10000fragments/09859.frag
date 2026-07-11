uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.82; vec2 jc = vec2(-0.69 + 0.3 * sin(t * 0.68 + ph), -0.43 + 0.3 * cos(t * 0.68 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 23; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(23) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.21;
	p *= 1.99;
	{ p = vec2(atan(p.y, p.x) * 2.76, length(p) * 2.70 - time * 0.16); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.50 + time * 0.03, vec3(0.56, 0.55, 0.47), vec3(0.32, 0.37, 0.44), vec3(0.75, 1.02, 1.36), vec3(0.77, 0.55, 0.04));
	col = mod(col * 2.83, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
