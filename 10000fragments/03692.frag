uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.12) - 0.5;
    float rad = 0.39 + 0.12 * sin(t * 3.13 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.55;
	p = rot2(length(p) * 3.71 + time * 1.14) * p;
	p = rot2(2.24) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.34), field(p, time, 2.67));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
