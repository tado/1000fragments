uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.21 + sr * 14.43 - t * 4.16 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.59, 0.27) * sin(length(p) * 3.61 - time * 1.04) * 0.17;
	p = rot2(p.y * 2.07 + time * 0.12) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.10), field(p, time, 2.21));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.52, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
