uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.37; vec2 jc = vec2(-0.06 + 0.3 * sin(t * 0.36 + ph), -0.14 + 0.3 * cos(t * 1.09 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 36; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 36.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * 1.72 + time * 1.16) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.39; p = rot2(1.54) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.00 + time * 0.23);
	col = fract(col * 2.49);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
