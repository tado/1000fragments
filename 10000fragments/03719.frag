uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.25) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 0.64 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.43;
	p = rot2(p.y * -2.31 + time * 0.68) * p;
	p = rot2(time * -0.25) * p;
	p += vec2(0.68, 0.74) * sin(length(p) * 2.42 - time * 1.07) * 0.12;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.58), field(p, time, 1.17));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
