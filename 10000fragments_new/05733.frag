uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.79 + sr * 7.78 - t * 2.62 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.73;
	p = rot2(p.y * 2.73 + time * 0.98) * p;
	p += vec2(-0.17, 0.95) * sin(length(p) * 2.67 - time * 1.09) * 0.24;
	p.y += sin(p.x * 7.63 + time * 3.02) * 0.31;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.05, 0.16, 0.31), vec3(0.82, 0.79, 0.86), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
