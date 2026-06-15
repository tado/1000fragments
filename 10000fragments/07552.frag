uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.72 + sr * 12.05 - t * 3.04 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.23;
	p = rot2(p.y * 1.40 + time * 0.11) * p;
	p += vec2(-0.66, 0.23) * sin(length(p) * 2.61 - time * 1.90) * 0.14;
	p = rot2(time * 0.30) * p;
	p = abs(p) - 0.36;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.40, 0.34, 0.00), vec3(0.51, 0.75, 0.51), d);
	col = mod(col * 2.63, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
