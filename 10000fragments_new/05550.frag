uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.31 + t * 4.84 + ph) + sin(p.y * 3.43 - t * 2.78 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.95;
	p = rot2(time * 0.51) * p;
	p = (floor(p * 26.0) + 0.5) / 26.0;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.68), field(p, time, 1.36));
	col = 0.5 + 0.5 * col;
	col *= 0.84 + 0.17 * sin(gl_FragCoord.y * 2.58 + time * 4.39);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
