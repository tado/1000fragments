uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.68 + t * 0.80 + ph) + sin(p.y * 2.80 - t * 0.80 + ph)
        + sin((p.x + p.y) * 5.04 + t * 0.80 + ph) + sin(length(p) * 14.90 - t * 0.80 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.90;
	p = rot2(length(p) * 3.44 + time * 1.19) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.76), field(p, time, 1.53));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
