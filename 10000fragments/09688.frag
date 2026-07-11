uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.96; vec2 jc = vec2(-0.28 + 0.3 * sin(t * 0.22 + ph), 0.52 + 0.3 * cos(t * 0.22 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 40; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(40) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.75 + sr * 22.37 - t * 4.28 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.46;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.97);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.70 + time * 0.26, vec3(0.52, 0.58, 0.57), vec3(0.39, 0.35, 0.46), vec3(0.75, 1.10, 0.83), vec3(0.35, 0.93, 0.26));
	col = clamp((col - 0.5) * 1.91 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
