uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.77; vec2 jc = vec2(0.32 + 0.3 * sin(t * 1.21 + ph), -0.04 + 0.3 * cos(t * 1.21 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 35; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(35) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.63;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.01 + time * 0.28, vec3(0.55, 0.55, 0.53), vec3(0.46, 0.45, 0.35), vec3(0.85, 0.76, 1.26), vec3(0.57, 0.12, 0.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
