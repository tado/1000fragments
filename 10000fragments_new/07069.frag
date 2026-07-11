uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.42; vec2 jc = vec2(-0.53 + 0.3 * sin(t * 1.54 + ph), -0.14 + 0.3 * cos(t * 1.36 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 35; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 35.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.35;
	p = rot2(p.y * 3.53 + time * 1.15) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.23; p = rot2(0.71) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.75, 0.51, 0.38) * (0.25 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
