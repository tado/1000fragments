uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.96) - 0.5;
    float rad = 0.25 + 0.12 * sin(t * 0.96 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.91;
	p = rot2(length(p) * 3.36 + time * 0.66) * p;
	p += vec2(-0.23, -0.34) * sin(length(p) * 3.00 - time * 0.97) * 0.11;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.59), field(p, time, 1.18));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.82, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
