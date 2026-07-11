uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.13 + t * 5.60 + ph) + sin(p.y * 8.78 - t * 4.02 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * -3.51 + time * 1.15) * p;
	{ p = vec2(atan(p.y, p.x) * 2.77, length(p) * 2.81 - time * 0.77); }
	p += vec2(-0.59, 0.34) * sin(length(p) * 3.89 - time * 1.44) * 0.14;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.65), field(p, time, 1.29));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
