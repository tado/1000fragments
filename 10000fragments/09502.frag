uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.21; vec2 jc = vec2(-0.32 + 0.3 * sin(t * 0.83 + ph), -0.73 + 0.3 * cos(t * 0.83 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 24; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(24) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.62;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.53 + time * 0.23, vec3(0.57, 0.50, 0.40), vec3(0.46, 0.34, 0.41), vec3(1.32, 0.72, 1.23), vec3(0.91, 0.41, 0.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
