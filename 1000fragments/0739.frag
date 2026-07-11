uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.98 + t * 2.07 + ph) + sin(p.y * 7.97 - t * 3.23 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * -2.63 + time * 0.67) * p;
	p = abs(p) - 0.33;
	p = rot2(0.59) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.60), field(p, time, 1.20));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
