uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.96 + 0.34 * sin(t * 0.72)) + vec2(-0.70, 0.03) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 28; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 28.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 1.41) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.97, lr * 1.77 + time * -0.92); }
	p = rot2(0.90) * p;
	p = rot2(length(p) * 3.11 + time * 0.92) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.46), field(p, time, 0.92));
	col = 0.5 + 0.5 * col;
	col *= 0.86 + 0.12 * sin(gl_FragCoord.y * 0.81 + time * 13.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
