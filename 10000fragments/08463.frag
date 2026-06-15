uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.86 + t * 0.55 + ph) + sin(p.y * 4.26 - t * 0.55 + ph)
        + sin((p.x + p.y) * 3.26 + t * 0.55 + ph) + sin(length(p) * 9.97 - t * 0.55 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.60;
	p = rot2(2.12) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.34), field(p, time, 2.67));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
