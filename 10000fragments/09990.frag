uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.92; vec2 jc = vec2(0.39 + 0.3 * sin(t * 0.25 + ph), -0.77 + 0.3 * cos(t * 0.25 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 31; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(31) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.44;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.72 + time * 0.07, vec3(0.41, 0.55, 0.53), vec3(0.37, 0.37, 0.40), vec3(0.85, 1.35, 0.85), vec3(0.11, 0.60, 0.91));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
