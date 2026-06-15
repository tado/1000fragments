uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.23; vec2 jc = vec2(-0.48 + 0.3 * sin(t * 0.46 + ph), 0.14 + 0.3 * cos(t * 0.46 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 37; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(37) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.79;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.59; p = rot2(2.49) * p; }
	{ float fr = length(p); p *= 1.0 + 0.65 * fr * fr; }
	p *= 1.64;
	p = fract(p * 1.37) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.94), field(p, time, 1.88));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
