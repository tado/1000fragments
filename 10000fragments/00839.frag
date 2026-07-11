uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.73 + sin(p.y * 4.66 + t * 5.54) * 2.75 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.25) - 0.5;
	p = rot2(time * -0.98) * p;
	p *= 1.35;
	p = abs(p) - 0.35;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.20), field(p, time, 2.40));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
