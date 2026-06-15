uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.74 + t * 4.56 + ph) + sin(p.y * 3.69 - t * 4.56 + ph)
        + sin((p.x + p.y) * 3.48 + t * 4.56 + ph) + sin(length(p) * 13.52 - t * 4.56 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.46;
	p *= 1.62;
	p = rot2(1.91) * p;
	p = fract(p * 1.47) - 0.5;
	{ float fr = length(p); p *= 1.0 + 0.31 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.61), field(p, time, 1.22));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
