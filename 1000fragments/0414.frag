uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.52 + sin(p.y * 2.38 + t * 2.00) * 1.81 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.25;
	p = rot2(length(p) * -1.91 + time * 0.49) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.14), field(p, time, 2.28));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.86, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
