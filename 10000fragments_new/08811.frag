uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.93; vec2 jc = vec2(-0.47 + 0.3 * sin(t * 0.33 + ph), -0.41 + 0.3 * cos(t * 1.46 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 32; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 32.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.07;
	p = fract(p * 2.62) - 0.5;
	p += vec2(0.68, -0.46) * sin(length(p) * 5.01 - time * 0.81) * 0.30;
	p = abs(p) - 0.39;
	p = rot2(time * -1.40) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.97), field(p, time, 1.94));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.87, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
