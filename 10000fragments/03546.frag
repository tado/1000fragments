uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.75) - 0.5;
    float rad = 0.37 + 0.12 * sin(t * 1.31 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.97;
	p += vec2(-0.50, 0.10) * sin(length(p) * 4.46 - time * 0.61) * 0.17;
	p = rot2(time * -1.36) * p;
	{ p = vec2(atan(p.y, p.x) * 2.07, length(p) * 2.05 - time * 0.34); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.34), field(p, time, 2.69));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.23, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
