uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.79 + sr * 11.10 - t * 1.16 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * 2.32 + time * 0.61) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.46), field(p, time, 0.91));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.77, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
