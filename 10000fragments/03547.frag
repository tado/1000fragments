uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.14) - 0.5;
    float rad = 0.22 + 0.12 * sin(t * 0.93 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.02;
	p = fract(p * 2.00) - 0.5;
	p *= 3.06;
	p = rot2(p.y * -1.86 + time * 0.65) * p;
	{ p = vec2(atan(p.y, p.x) * 1.84, length(p) * 2.49 - time * 0.41); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.10), field(p, time, 2.19));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.66 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
