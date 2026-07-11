uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.71) - 0.5;
    float rad = 0.28 + 0.12 * sin(t * 2.07 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.56;
	p = rot2(length(p) * 3.18 + time * 1.20) * p;
	p = fract(p * 1.50) - 0.5;
	p += vec2(-0.49, 0.66) * sin(length(p) * 4.05 - time * 2.35) * 0.38;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.96), field(p, time, 1.93));
	col = 0.5 + 0.5 * col;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.26 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
