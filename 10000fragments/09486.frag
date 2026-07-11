uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.29; vec2 jc = vec2(-0.53 + 0.3 * sin(t * 0.99 + ph), 0.52 + 0.3 * cos(t * 0.99 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 19; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(19) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.86;
	{ float fr = length(p); p *= 1.0 + -0.53 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.31, lr * 1.99 + time * -0.79); }
	p = rot2(length(p) * 2.43 + time * 0.68) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.56; p = rot2(1.26) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.51), field(p, time, 1.03));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.60, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
