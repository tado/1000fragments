uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.64; vec2 jc = vec2(0.24 + 0.3 * sin(t * 0.41 + ph), 0.59 + 0.3 * cos(t * 0.41 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 20; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(20) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.38;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.43 + time * 0.28, vec3(0.42, 0.53, 0.58), vec3(0.48, 0.35, 0.42), vec3(1.11, 1.38, 0.91), vec3(0.82, 0.97, 0.80));
	col = clamp((col - 0.5) * 1.30 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
