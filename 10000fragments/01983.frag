uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.39; vec2 jc = vec2(-0.17 + 0.3 * sin(t * 1.06 + ph), 0.41 + 0.3 * cos(t * 1.06 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 31; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(31) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.18;
	p = fract(p * 2.99) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.67, length(p) * 3.17 - time * 0.34); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.86 + time * 0.17, vec3(0.53, 0.49, 0.59), vec3(0.45, 0.40, 0.41), vec3(1.15, 1.11, 0.85), vec3(0.80, 0.87, 0.83));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
