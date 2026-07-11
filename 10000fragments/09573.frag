uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.62; vec2 jc = vec2(-0.36 + 0.3 * sin(t * 0.62 + ph), -0.78 + 0.3 * cos(t * 0.62 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 19; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(19) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.91;
	p += vec2(0.83, -0.78) * sin(length(p) * 2.27 - time * 1.35) * 0.17;
	p = fract(p * 2.44) - 0.5;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.13 + time * 0.26, vec3(0.54, 0.46, 0.54), vec3(0.45, 0.48, 0.34), vec3(1.35, 1.24, 0.95), vec3(0.46, 0.09, 0.95));
	col = mod(col * 2.33, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
