uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.07; vec2 jc = vec2(0.04 + 0.3 * sin(t * 0.67 + ph), 0.04 + 0.3 * cos(t * 1.11 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 22; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 22.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.26;
	p *= 1.0 + 0.16 * sin(time * 1.24);
	p = abs(p) - 0.76;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.22 + time * 0.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
