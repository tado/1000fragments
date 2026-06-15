uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.89; vec2 jc = vec2(-0.19 + 0.3 * sin(t * 0.87 + ph), -0.02 + 0.3 * cos(t * 0.87 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 33; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(33) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.51;
	p = fract(p * 2.78) - 0.5;
	p *= 1.94;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.99 + time * 0.09, vec3(0.42, 0.54, 0.55), vec3(0.45, 0.38, 0.43), vec3(0.84, 0.82, 0.99), vec3(0.92, 0.84, 0.54));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
