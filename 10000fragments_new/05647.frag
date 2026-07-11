uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.40 + t * 5.49 + ph) + sin(p.y * 7.99 - t * 0.98 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.34;
	p = rot2(p.y * -3.71 + time * 0.92) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.45), field(p, time, 0.90));
	col = 0.5 + 0.5 * col;
	col *= 0.83 + 0.19 * sin(gl_FragCoord.y * 2.61 + time * 8.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
