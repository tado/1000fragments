uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.99; vec2 jc = vec2(0.21 + 0.3 * sin(t * 0.71 + ph), 0.57 + 0.3 * cos(t * 0.71 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 35; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(35) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.70;
	{ p = vec2(atan(p.y, p.x) * 1.49, length(p) * 4.82 - time * 0.46); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.53 + time * 0.21, vec3(0.50, 0.56, 0.58), vec3(0.31, 0.38, 0.35), vec3(1.21, 0.88, 0.76), vec3(0.23, 0.92, 0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
