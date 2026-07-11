uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.37; vec2 jc = vec2(-0.21 + 0.3 * sin(t * 0.59 + ph), -0.27 + 0.3 * cos(t * 0.59 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 20; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(20) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.00;
	p *= 1.39;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.53 + time * 0.13, vec3(0.44, 0.43, 0.50), vec3(0.42, 0.33, 0.32), vec3(1.13, 1.38, 1.15), vec3(0.38, 0.93, 0.27));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
