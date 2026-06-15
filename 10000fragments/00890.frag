uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.96; vec2 jc = vec2(0.04 + 0.3 * sin(t * 0.41 + ph), -0.50 + 0.3 * cos(t * 0.41 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 27; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(27) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.78;
	p = fract(p * 1.08) - 0.5;
	{ float fr = length(p); p *= 1.0 + -0.75 * fr * fr; }
	p *= 3.47;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.93 + time * 0.15, vec3(0.44, 0.57, 0.56), vec3(0.49, 0.38, 0.31), vec3(0.99, 1.06, 0.81), vec3(0.07, 0.48, 0.66));
	col = clamp((col - 0.5) * 1.43 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
