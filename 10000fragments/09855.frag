uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.97; vec2 jc = vec2(-0.22 + 0.3 * sin(t * 1.38 + ph), -0.08 + 0.3 * cos(t * 1.38 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 18; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(18) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.01;
	p *= 3.03;
	p = fract(p * 2.38) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.29, vec3(0.58, 0.42, 0.57), vec3(0.32, 0.34, 0.31), vec3(1.12, 1.05, 0.98), vec3(0.17, 0.71, 0.02));
	col = fract(col * 1.95);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
