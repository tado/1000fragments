uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.36 + t * 0.90 + ph) + sin(p.y * 4.50 - t * 0.90 + ph)
        + sin((p.x + p.y) * 7.53 + t * 0.90 + ph) + sin(length(p) * 13.18 - t * 0.90 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 1.30) - 0.5;
	p = rot2(p.y * 3.13 + time * 0.67) * p;
	p = rot2(2.84) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.70), field(p, time, 1.39));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
