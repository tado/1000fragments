uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.23) - 0.5;
    float rad = 0.43 + 0.12 * sin(t * 1.24 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.51, 0.01) * sin(length(p) * 4.53 - time * 1.19) * 0.33;
	p = rot2(p.y * 2.49 + time * 0.94) * p;
	{ p = vec2(atan(p.y, p.x) * 1.33, length(p) * 3.67 - time * 0.61); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.30), field(p, time, 0.59));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.95, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
