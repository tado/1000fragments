uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.58; vec2 jc = vec2(0.20 + 0.3 * sin(t * 1.74 + ph), 0.35 + 0.3 * cos(t * 1.06 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 22; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 22.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.73;
	p += vec2(-0.79, 0.71) * sin(length(p) * 3.60 - time * 2.38) * 0.22;
	p *= 1.79;
	p = fract(p * 2.63) - 0.5;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.58; p = rot2(2.20) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.14, 0.98, 1.54) + vec3(0.23, 0.01, 0.19);
	col *= 0.89 + 0.20 * sin(gl_FragCoord.y * 2.80 + time * 8.53);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
