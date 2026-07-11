uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.41 + sin(p.y * 3.45 + t * 2.87) * 1.19 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.86;
	p.x += sin(p.y * 7.63 + time * 2.22) * 0.16;
	p = rot2(length(p) * -3.87 + time * 0.34) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.85), field(p, time, 1.70));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
