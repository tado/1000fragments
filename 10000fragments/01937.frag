uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.98 + sr * 9.23 - t * 1.52 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.48;
	p = rot2(time * 1.33) * p;
	p = rot2(p.y * 1.31 + time * 0.69) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.02, 0.36, 0.06), vec3(0.71, 0.60, 0.91), d);
	col = mod(col * 2.98, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
