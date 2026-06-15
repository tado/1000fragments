uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.49 + t * 5.67 + ph) + sin(p.y * 12.89 - t * 1.29 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 3.47;
	p = rot2(0.90) * p;
	{ float fr = length(p); p *= 1.0 + 0.36 * fr * fr; }
	p = rot2(length(p) * -1.63 + time * 0.86) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.49), field(p, time, 0.97));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.79));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
