uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.14 + sr * 20.03 - t * 1.90 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.10;
	p = rot2(time * 0.73) * p;
	p = fract(p * 2.92) - 0.5;
	p += vec2(0.05, -0.47) * sin(length(p) * 3.15 - time * 1.07) * 0.12;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.30), field(p, time, 2.59));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.46);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
