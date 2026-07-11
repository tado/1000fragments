uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.66; vec2 jc = vec2(-0.03 + 0.3 * sin(t * 0.65 + ph), 0.45 + 0.3 * cos(t * 0.65 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 31; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(31) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.79;
	{ float fr = length(p); p *= 1.0 + -0.22 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.44 + time * 0.01, vec3(0.56, 0.50, 0.43), vec3(0.40, 0.38, 0.35), vec3(0.95, 0.86, 1.09), vec3(0.78, 0.79, 0.92));
	col = fract(col * 1.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
