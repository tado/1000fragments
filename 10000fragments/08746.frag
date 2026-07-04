uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.72) - 0.5;
    float rad = 0.42 + 0.12 * sin(t * 2.51 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.91) - 0.5;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 0.98));
	{ p = vec2(atan(p.y, p.x) * 1.50, length(p) * 4.82 - time * 0.90); }
	p = rot2(length(p) * 2.91 + time * 1.01) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.87), field(p, time, 1.74));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
