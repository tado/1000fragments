uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.45 + t * 3.57 + ph) + sin(p.y * 7.44 - t * 3.57 + ph)
        + sin((p.x + p.y) * 7.91 + t * 3.57 + ph) + sin(length(p) * 15.63 - t * 3.57 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.58;
	p.x += sin(p.y * 6.55 + time * 3.19) * 0.13;
	p = rot2(length(p) * 2.67 + time * 0.56) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.42), field(p, time, 0.84));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
