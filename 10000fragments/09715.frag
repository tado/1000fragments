uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.83; vec2 jc = vec2(-0.29 + 0.3 * sin(t * 1.12 + ph), -0.76 + 0.3 * cos(t * 1.12 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 32; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(32) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.41;
	{ float fr = length(p); p *= 1.0 + 0.53 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.82, length(p) * 5.53 - time * 0.74); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.56 + time * 0.24, vec3(0.54, 0.55, 0.54), vec3(0.40, 0.43, 0.35), vec3(1.16, 1.15, 0.73), vec3(0.25, 0.06, 0.02));
	col = mod(col * 1.48, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
