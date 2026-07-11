uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.86; vec2 jc = vec2(-0.02 + 0.3 * sin(t * 0.87 + ph), -0.45 + 0.3 * cos(t * 0.87 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 20; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(20) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.22;
	{ p = vec2(atan(p.y, p.x) * 2.86, length(p) * 5.44 - time * 0.43); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p);
	p = fract(p * 1.57) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.72 + time * 0.08, vec3(0.42, 0.55, 0.55), vec3(0.46, 0.33, 0.36), vec3(1.01, 1.19, 1.38), vec3(0.05, 0.29, 0.92));
	col = fract(col * 1.49);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
