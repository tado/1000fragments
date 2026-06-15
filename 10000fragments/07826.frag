uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.15 + t * 3.86 + ph) + sin(p.y * 5.81 - t * 4.32 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 2.89, length(p) * 3.34 - time * 0.75); }
	p = rot2(2.63) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.21), field(p, time, 0.43));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
