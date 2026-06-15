uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.93; vec2 jc = vec2(-0.56 + 0.3 * sin(t * 0.44 + ph), -0.20 + 0.3 * cos(t * 0.44 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 16; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(16) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.69;
	{ float fr = length(p); p *= 1.0 + 0.51 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.87, length(p) * 5.34 - time * 0.62); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.98 + time * 0.23, vec3(0.56, 0.40, 0.53), vec3(0.40, 0.32, 0.33), vec3(1.17, 1.12, 0.98), vec3(0.83, 0.21, 0.17));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
