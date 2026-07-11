uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.20 + t * 2.89 + ph) + sin(p.y * 10.20 - t * 2.89 + ph)
        + sin((p.x + p.y) * 9.08 + t * 2.89 + ph) + sin(length(p) * 17.21 - t * 2.89 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.62;
	p *= 1.52;
	p = rot2(time * 0.63) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.29), field(p, time, 0.57));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
