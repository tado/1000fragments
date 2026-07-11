uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.60 + t * 3.96 + ph) + sin(p.y * 9.24 - t * 3.96 + ph)
        + sin((p.x + p.y) * 6.53 + t * 3.96 + ph) + sin(length(p) * 9.05 - t * 3.96 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.46;
	p = rot2(p.y * 2.43 + time * 0.79) * p;
	p.y += sin(p.x * 7.54 + time * 3.78) * 0.11;
	{ p = vec2(atan(p.y, p.x) * 1.88, length(p) * 4.12 - time * 0.87); }
	p = rot2(length(p) * 3.97 + time * 0.63) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.38), field(p, time, 2.75));
	col = 0.5 + 0.5 * col;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.33 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
