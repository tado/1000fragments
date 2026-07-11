uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.22 + sin(p.y * 3.21 + t * 2.22) * 2.44 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.91;
	p = rot2(length(p) * -1.31 + time * 0.51) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.50), field(p, time, 0.99));
	col = 0.5 + 0.5 * col;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.15 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
