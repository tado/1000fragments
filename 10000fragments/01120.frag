uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.38 + t * 1.58 + ph) + sin(p.y * 6.58 - t * 1.58 + ph)
        + sin((p.x + p.y) * 11.33 + t * 1.58 + ph) + sin(length(p) * 3.11 - t * 1.58 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p);
	p = rot2(0.54) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.46), field(p, time, 0.93));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
