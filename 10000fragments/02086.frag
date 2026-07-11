uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.49 + sr * 5.24 - t * 3.67 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * -3.01 + time * 0.22) * p;
	p = rot2(0.36) * p;
	p = fract(p * 2.87) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.43, 0.03, 0.04), vec3(0.73, 0.94, 0.84), d);
	col = fract(col * 1.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
