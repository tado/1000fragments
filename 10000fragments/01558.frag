uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.21 + sr * 19.69 - t * 2.68 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.56; p = rot2(1.04) * p; }
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.37));
	p = fract(p * 1.15) - 0.5;
	p = rot2(length(p) * -2.47 + time * 1.28) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.57), field(p, time, 1.13));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.66 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
