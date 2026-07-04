uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.68 + t * 2.00 + ph) + sin(p.y * 5.43 - t * 2.00 + ph)
        + sin((p.x + p.y) * 6.13 + t * 2.00 + ph) + sin(length(p) * 17.93 - t * 2.00 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.82;
	p = (floor(p * 10.5) + 0.5) / 10.5;
	p *= 1.0 + 0.16 * sin(time * 1.44);
	p = rot2(length(p) * -3.65 + time * 0.46) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.63), field(p, time, 1.26));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
