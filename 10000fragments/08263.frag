uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.57 + sin(p.y * 5.23 + t * 4.73) * 3.70 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.09;
	p = rot2(length(p) * 2.82 + time * 0.56) * p;
	p *= 1.0 + 0.16 * sin(time * 3.17);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.19), field(p, time, 2.38));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
