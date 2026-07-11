uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.50 + t * 1.96 + ph) + sin(p.y * 11.52 - t * 1.96 + ph)
        + sin((p.x + p.y) * 7.72 + t * 1.96 + ph) + sin(length(p) * 14.34 - t * 1.96 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p);
	p += vec2(-0.59, -0.53) * sin(length(p) * 4.09 - time * 1.25) * 0.27;
	p *= 3.30;
	p = rot2(length(p) * -3.71 + time * 1.08) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.03), field(p, time, 2.05));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.43 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
