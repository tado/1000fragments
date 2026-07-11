uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.40; vec2 jc = vec2(0.34 + 0.3 * sin(t * 0.73 + ph), -0.59 + 0.3 * cos(t * 0.33 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 27; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 27.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.07, length(p) * 5.62 - time * 0.49); }
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.96;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.61 + time * 0.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
