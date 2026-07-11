uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.05; vec2 jc = vec2(-0.65 + 0.3 * sin(t * 1.01 + ph), -0.67 + 0.3 * cos(t * 0.66 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 34.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * -2.00 + time * 0.49) * p;
	{ p = vec2(atan(p.y, p.x) * 2.80, length(p) * 4.07 - time * 0.99); }
	p = fract(p * 1.53) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.58 + time * 0.09);
	col = clamp((col - 0.5) * 2.20 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
