uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.80; vec2 jc = vec2(-0.60 + 0.3 * sin(t * 0.30 + ph), 0.57 + 0.3 * cos(t * 0.30 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 22; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(22) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.91;
	p += vec2(-0.73, 0.89) * sin(length(p) * 3.80 - time * 1.45) * 0.37;
	p = rot2(time * -0.71) * p;
	p = abs(p) - 0.39;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.85 + time * 0.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
